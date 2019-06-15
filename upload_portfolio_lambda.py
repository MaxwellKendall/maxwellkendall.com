import boto3, zipfile, StringIO, mimetypes, time

def lambda_handler(event, context):
    s3 = boto3.resource("s3")
    sns = boto3.resource('sns')
    cf = boto3.client('cloudfront')
    cfId = 'E2K1YE12XJKXWU'
    cf_signature=int(round(time.time()))
    topic = sns.Topic('arn:aws:sns:us-east-1:304945936761:deployMaxwellkendall')
    location = {
      "bucketName": "maxwellkendall.build",
      "objectKey": "maxwellkendall-build"
    }
    
    try:
      job = event.get("CodePipeline.job")
      if job:
        for artifact in job["data"]["inputArtifacts"]:
          if artifact["name"] == "BuildArtifact":
            location = artifact["location"]["s3Location"]
      build_bucket = s3.Bucket(location["bucketName"])
      prod_bucket = s3.Bucket("maxwellkendall.com")
      inMemoryBuildZip = StringIO.StringIO()
      
      build_bucket.download_fileobj(location["objectKey"], inMemoryBuildZip)
      
      print "Building portfolio from", str(location)
      
      with zipfile.ZipFile(inMemoryBuildZip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            # removing prepended public/ for each build file
      
            if mimetypes.guess_type(nm)[0] != None:
              prod_bucket.upload_fileobj(obj, nm[7:],
              ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
            else:
              prod_bucket.upload_fileobj(obj, nm[7:])
            prod_bucket.Object(nm[7:]).Acl().put(ACL='public-read')
      
      topic.publish(Subject="Maxwellkendall.com | Successful Deploy", Message="Maxwellkendall.com was just deployed")
      cf.create_invalidation(
        DistributionId=cfId,
        InvalidationBatch={
          'Paths': {
              'Quantity': 123,
              'Items': [
                  '/*',
              ]
          },
          'CallerReference': str(cf_signature)
        }
      )
      codepipeline = boto3.client("codepipeline")
      codepipeline.put_job_success_result(jobId=job["id"])
    except:
      if job:
        codepipeline = boto3.client("codepipeline")
        codepipeline.put_job_failure_result(jobId=job["id"], failureDetails={
          "type": "JobFailed",
          "message": "Sorry, job failed",
          "externalExecutionId": "123"
        })
      
      topic.publish(Subject="Maxwellkendall.com | Failed Deploy", Message="Maxwellkendall.com just failed to deploy") 
      raise
    