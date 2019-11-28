---
title: EC2
tags: keepin it real, checkin yo self, doin big thangs
featuredImage: ../../images/aws_logo.png
---

# EC2
## Pricing
- **Spot**
	- 90% cheaper than On Demand
	- Uses spare EC2 compute capacity
- **On Demand**
	- By hr/second
	- No long term commitment
- **Reserved**
	- Long term (1-3 yr) commitment
- **Dedicated Host**
	- Reserved/On Demand pricing available
	- Uses actual physical server for you only

**POPULAR QUESTION**
- Terminating instance by EC2 is no charge; terminating instance manually results in a charge

## Types of Instances
Instances optimized for:
- Storage
- Memory
- Computation

## Storage
Storage in an EC2 instance is done via “elastic blocks.” There are various levels and kinds of storage designed to serve different purposes.

### Kinds of Storage

**Hard Disk Drive (HDD)**
- Dominant performance metric is MBPS (throughput)
- Large, streaming data

**Solid State Drive (SSD)**
- Dominant performance metric is IOPS
- Designed for transactional data; meaning, not analyzing big data or returning huge responses, but handling a high volume of reads/writes

**Instance Store Volumes**
- Ephemeral storage
- Only configurable at launch

### Tiers of Storage
#### SSD 
- **Standard**
	- IOPS calculated based on volume size.
- **Provisioned**
	- IOPS configurable; guaranteed **99.99%** of the time
#### HDD 
- **Throughput Optimized**
- **Cold**

### Elastic File System
You can create an EFS file system and configure your instances to mount the file system. You can use an EFS file system as a common data source for workloads and applications running on multiple instances. 

## Placement Groups
How to distribute your instances per use case.

- Clustered
	- High throughput/low-latency
	- Peered VPCs in the same region can talk together
	- Only single AZ
- Partitioned
	- No two clusters share same hardware/network/power-source
	- Maximum of 7 partitions per AZ
- Spread
	- To avoid hardware failure

#aws/associate/test-prep