// AWS Solutions Architect Pro Exam Questions
export const questions = [
  {
    id: 1,
    topic: "Storage",
    question: "A company collects data for temperature, humidity, and atmospheric pressure in cities across multiple continents. The average volume of data that the company collects from each site daily is 500 GB. Each site has a high-speed Internet connection. The company wants to aggregate the data from all these global sites as quickly as possible in a single Amazon S3 bucket. The solution must minimize operational complexity. Which solution meets these requirements?",
    options: [
      "Turn on S3 Transfer Acceleration on the destination S3 bucket. Use multipart uploads to directly upload site data to the destination S3 bucket.",
      "Upload the data from each site to an S3 bucket in the closest Region. Use S3 Cross-Region Replication to copy objects to the destination S3 bucket. Then remove the data from the origin S3 bucket.",
      "Schedule AWS Snowball Edge Storage Optimized device jobs daily to transfer data from each site to the closest Region. Use S3 Cross-Region Replication to copy objects to the destination S3 bucket.",
      "Upload the data from each site to an Amazon EC2 instance in the closest Region. Store the data in an Amazon Elastic Block Store (Amazon EBS) volume. At regular intervals, take an EBS snapshot and copy it to the Region that contains the destination S3 bucket."
    ],
    correctAnswer: 0,
    explanation: "S3 Transfer Acceleration uses Edge Locations to speed up content transfers to and from S3 by 50-500%. It works ideally with objects for long-distance transfer and can be used for mobile & web application uploads."
  },
  {
    id: 2,
    topic: "Analytics",
    question: "A company needs the ability to analyze the log files of its proprietary application. The logs are stored in JSON format in an Amazon S3 bucket. Queries will be simple and will run on-demand. A solutions architect needs to perform the analysis with minimal changes to the existing architecture. What should the solutions architect do to meet these requirements with the LEAST amount of operational overhead?",
    options: [
      "Use Amazon Redshift to load all the content into one place and run the SQL queries as needed.",
      "Use Amazon CloudWatch Logs to store the logs. Run SQL queries as needed from the Amazon CloudWatch console.",
      "Use Amazon Athena directly with Amazon S3 to run the queries as needed.",
      "Use AWS Glue to catalog the logs. Use a transient Apache Spark cluster on Amazon EMR to run the SQL queries as needed."
    ],
    correctAnswer: 2,
    explanation: "Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon S3 using standard SQL. With a few actions in the AWS Management Console, you can point Athena at your data stored in Amazon S3 and begin using standard SQL to run ad-hoc queries."
  },
  {
    id: 3,
    topic: "Security",
    question: "A company uses AWS Organizations to manage multiple AWS accounts for different departments. The management account has an Amazon S3 bucket that contains project reports. The company wants to limit access to this S3 bucket to only users of accounts within the organization in AWS Organizations. Which solution meets these requirements with the LEAST amount of operational overhead?",
    options: [
      "Add the aws:PrincipalOrgID global condition key with a reference to the organization ID to the S3 bucket policy.",
      "Create an organizational unit (OU) for each department. Add the aws:PrincipalOrgPaths global condition key to the S3 bucket policy.",
      "Use AWS CloudTrail to monitor the CreateAccount, InviteAccountToOrganization, LeaveOrganization, and RemoveAccountFromOrganization events. Update the S3 bucket policy accordingly.",
      "Tag each user that needs access to the S3 bucket. Add the aws:PrincipalTag global condition key to the S3 bucket policy."
    ],
    correctAnswer: 0,
    explanation: "aws:PrincipalOrgID provides an alternative to listing all the account IDs for all AWS accounts in an organization. You can specify the organization ID in the Condition element to limit access to only users within the organization."
  },
  {
    id: 4,
    topic: "Networking",
    question: "An application runs on an Amazon EC2 instance in a VPC. The application processes logs that are stored in an Amazon S3 bucket. The EC2 instance needs to access the S3 bucket without connectivity to the internet. Which solution will provide private network connectivity to Amazon S3?",
    options: [
      "Create a gateway VPC endpoint to the S3 bucket.",
      "Stream the logs to Amazon CloudWatch Logs. Export the logs to the S3 bucket.",
      "Create an instance profile on Amazon EC2 to allow S3 access.",
      "Create an Amazon API Gateway API with a private link to access the S3 endpoint."
    ],
    correctAnswer: 0,
    explanation: "VPC endpoint allows you to connect to AWS services using a private network instead of using the public Internet. Gateway endpoints do not allow access from on-premises networks, from peered VPCs in other AWS Regions, or through a transit gateway."
  },
  {
    id: 5,
    topic: "Storage",
    question: "A company is hosting a web application on AWS using a single Amazon EC2 instance that stores user-uploaded documents in an Amazon EBS volume. For better scalability and availability, the company duplicated the architecture and created a second EC2 instance and EBS volume in another Availability Zone, placing both behind an Application Load Balancer. After completing this change, users reported that, each time they refreshed the website, they could see one subset of their documents or the other, but never all of the documents at the same time. What should a solutions architect propose to ensure users see all of their documents at once?",
    options: [
      "Copy the data so both EBS volumes contain all the documents",
      "Configure the Application Load Balancer to direct a user to the server with the documents",
      "Copy the data from both EBS volumes to Amazon EFS. Modify the application to save new documents to Amazon EFS",
      "Configure the Application Load Balancer to send the request to both servers. Return each document from the correct server"
    ],
    correctAnswer: 2,
    explanation: "Amazon EFS provides scalability, availability, and shared access, allowing both EC2 instances to access and synchronize documents seamlessly. Unlike EBS volumes or snapshots, which cannot be shared in real time across multiple instances."
  },
  {
    id: 6,
    topic: "Migration",
    question: "A company uses NFS to store large video files in on-premises network attached storage. Each video file ranges in size from 1 MB to 500 GB. The total storage is 70 TB and is no longer growing. The company decides to migrate the video files to Amazon S3. The company must migrate the video files as soon as possible while using the least possible network bandwidth. Which solution will meet these requirements?",
    options: [
      "Create an S3 bucket. Create an IAM role that has permissions to write to the S3 bucket. Use the AWS CLI to copy all files locally to the S3 bucket.",
      "Create an AWS Snowball Edge job. Receive a Snowball Edge device on premises. Use the Snowball Edge client to transfer data to the device. Return the device so that AWS can import the data into Amazon S3.",
      "Deploy an S3 File Gateway on premises. Create a public service endpoint to connect to the S3 File Gateway. Create an S3 bucket. Create a new NFS file share on the S3 File Gateway. Point the new file share to the S3 bucket. Transfer the data from the existing NFS file share to the S3 File Gateway.",
      "Set up an AWS Direct Connect connection between the on-premises network and AWS. Deploy an S3 File Gateway on premises."
    ],
    correctAnswer: 1,
    explanation: "On a Snowball Edge device you can copy files with a speed of up to 100Gbps. 70TB will take around 5600 seconds, so very quickly, less than 2 hours. The total time is 6-9 working days with zero bandwidth used."
  },
  {
    id: 7,
    topic: "Compute",
    question: "A company has an application that ingests incoming messages. Dozens of other applications and microservices then quickly consume these messages. The number of messages varies drastically and sometimes increases suddenly to 100,000 each second. The company wants to decouple the solution and increase scalability. Which solution meets these requirements?",
    options: [
      "Persist the messages to Amazon Kinesis Data Streams. Configure consumers to read from the stream.",
      "Deploy the ingestion application on Amazon EC2 instances in an Auto Scaling group to scale the number of EC2 instances based on CPU metrics.",
      "Write the messages to Amazon Simple Queue Service (Amazon SQS) with a single queue. Configure consumers to read from the queue.",
      "Persist the messages to Amazon Kinesis Data Firehose. Configure consumers to read from the stream."
    ],
    correctAnswer: 0,
    explanation: "Amazon Kinesis Data Streams is a real-time data streaming service that can handle high throughput and allows multiple consumers to read from the same stream simultaneously."
  },
  {
    id: 8,
    topic: "Database",
    question: "A company is running an SMB file server in its data center. The file server stores large files that are accessed frequently for the first few days after the files are created. After 7 days the files are rarely accessed. The total data size is increasing and is close to the company's total storage capacity. A solutions architect must increase the company's available storage space without losing low-latency access to the most recently accessed files. The solutions architect must also provide file lifecycle management to avoid future storage issues. Which solution will meet these requirements?",
    options: [
      "Use AWS DataSync to copy data that is older than 7 days from the SMB file server to AWS.",
      "Create an Amazon S3 File Gateway to extend the company's storage space. Create an S3 Lifecycle policy to transition the data to S3 Glacier Deep Archive after 7 days.",
      "Create an Amazon FSx for Windows File Server file system to extend the company's storage space.",
      "Install a utility on each user's computer to access Amazon S3. Create an S3 Lifecycle policy to transition the data to S3 Glacier Flexible Retrieval after 7 days."
    ],
    correctAnswer: 1,
    explanation: "Amazon S3 File Gateway provides a seamless way to connect to the cloud in order to store application data files and backup images as durable objects on Amazon S3 cloud storage."
  },
  {
    id: 9,
    topic: "High Availability",
    question: "A company is building an ecommerce web application on AWS. The application sends information about new orders to an Amazon API Gateway REST API to process. The company wants to ensure that orders are processed in the order that they are received. Which solution will meet these requirements?",
    options: [
      "Use an API Gateway integration to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic when the application receives an order. Subscribe an AWS Lambda function to the topic to perform processing.",
      "Use an API Gateway integration to send a message to an Amazon Simple Queue Service (Amazon SQS) FIFO queue when the application receives an order. Configure the SQS FIFO queue to invoke an AWS Lambda function for processing.",
      "Use an API Gateway authorizer to block any requests while the application processes an order.",
      "Use an API Gateway integration to send a message to an Amazon Simple Queue Service (Amazon SQS) standard queue when the application receives an order. Configure the SQS standard queue to invoke an AWS Lambda function for processing."
    ],
    correctAnswer: 1,
    explanation: "Amazon SQS FIFO queues are designed to guarantee that messages are processed exactly once, in the exact order that they are sent."
  },
  {
    id: 10,
    topic: "Security",
    question: "A company has a three-tier web application that is deployed on AWS. The web servers are deployed in a public subnet in a VPC. The application servers and database servers are deployed in private subnets in the same VPC. The company has deployed a third-party virtual firewall appliance from AWS Marketplace in an inspection VPC. The appliance is configured with an IP interface that can accept IP packets. A solutions architect needs to integrate the web application with the appliance to inspect all traffic to the application before the traffic reaches the web server. Which solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Create a Network Load Balancer in the public subnet of the application's VPC to route the traffic to the appliance for packet inspection.",
      "Create an Application Load Balancer in the public subnet of the application's VPC to route the traffic to the appliance for packet inspection.",
      "Deploy a transit gateway in the inspection VPC. Configure route tables to route the incoming packets through the transit gateway.",
      "Deploy a Gateway Load Balancer in the inspection VPC. Create a Gateway Load Balancer endpoint to receive the incoming packets and forward the packets to the appliance."
    ],
    correctAnswer: 3,
    explanation: "Gateway Load Balancer helps you easily deploy, scale, and manage your third-party virtual appliances. It gives you one gateway for distributing traffic across multiple virtual appliances while scaling them up or down."
  },
  {
    id: 11,
    topic: "Compute",
    question: "A company wants to improve its ability to clone large amounts of production data into a test environment in the same AWS Region. The data is stored in Amazon EC2 instances on Amazon Elastic Block Store (Amazon EBS) volumes. Modifications to the cloned data must not affect the production environment. The software that accesses this data requires consistently high I/O performance. A solutions architect needs to minimize the time that is required to clone the production data into the test environment. Which solution will meet these requirements?",
    options: [
      "Take EBS snapshots of the production EBS volumes. Restore the snapshots onto EC2 instance store volumes in the test environment.",
      "Configure the production EBS volumes to use the EBS Multi-Attach feature. Take EBS snapshots of the production EBS volumes. Attach the production EBS volumes to the EC2 instances in the test environment.",
      "Take EBS snapshots of the production EBS volumes. Create and initialize new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment before restoring the volumes from the production EBS snapshots.",
      "Take EBS snapshots of the production EBS volumes. Turn on the EBS fast snapshot restore feature on the EBS snapshots. Restore the snapshots into new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment."
    ],
    correctAnswer: 3,
    explanation: "EBS fast snapshot restore eliminates the need for I/O operations to initialize volumes from snapshots, providing full performance immediately upon creation."
  },
  {
    id: 12,
    topic: "Networking",
    question: "An ecommerce company wants to launch a one-deal-a-day website on AWS. Each day will feature exactly one product on sale for a period of 24 hours. The company wants to be able to handle millions of requests each hour with millisecond latency during peak hours. Which solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Use Amazon S3 to host the full website in different S3 buckets. Add Amazon CloudFront distributions. Set the S3 buckets as origins for the distributions. Store the order data in Amazon S3.",
      "Deploy the full website on Amazon EC2 instances that run in Auto Scaling groups across multiple Availability Zones. Add an Application Load Balancer (ALB) to distribute the website traffic. Add another ALB for the backend APIs. Store the data in Amazon RDS for MySQL.",
      "Migrate the full application to run in containers. Host the containers on Amazon Elastic Kubernetes Service (Amazon EKS). Use the Kubernetes Cluster Autoscaler to increase and decrease the number of pods to process bursts in traffic. Store the data in Amazon RDS for MySQL.",
      "Use an Amazon S3 bucket to host the website's static content. Deploy an Amazon CloudFront distribution. Set the S3 bucket as the origin. Use Amazon API Gateway and AWS Lambda functions for the backend APIs. Store the data in Amazon DynamoDB."
    ],
    correctAnswer: 3,
    explanation: "This serverless architecture using S3, CloudFront, API Gateway, Lambda, and DynamoDB provides the lowest operational overhead while handling millions of requests with millisecond latency."
  },
  {
    id: 13,
    topic: "Database",
    question: "A solutions architect is using Amazon S3 to design the storage architecture of a new digital media application. The media files must be resilient to the loss of an Availability Zone. Some files are accessed frequently while other files are rarely accessed in an unpredictable pattern. The solutions architect must minimize the costs of storing and retrieving the media files. Which storage option meets these requirements?",
    options: [
      "S3 Standard",
      "S3 Intelligent-Tiering",
      "S3 Standard-Infrequent Access (S3 Standard-IA)",
      "S3 One Zone-Infrequent Access (S3 One Zone-IA)"
    ],
    correctAnswer: 1,
    explanation: "S3 Intelligent-Tiering automatically moves data to the most cost-effective access tier based on access patterns, without performance impact or operational overhead."
  },
  {
    id: 14,
    topic: "Compute",
    question: "A company is storing backup files by using Amazon S3 Standard storage. The files are accessed frequently for 1 month. However, the files are not accessed after 1 month. The company must keep the files indefinitely. Which storage solution will meet these requirements MOST cost-effectively?",
    options: [
      "Configure S3 Intelligent-Tiering to automatically migrate objects.",
      "Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 Glacier Deep Archive after 1 month.",
      "Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 Standard-Infrequent Access (S3 Standard-IA) after 1 month.",
      "Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 1 month."
    ],
    correctAnswer: 1,
    explanation: "S3 Glacier Deep Archive is the lowest-cost storage class and supports long-term retention and digital preservation for data that may be accessed once or twice in a year."
  },
  {
    id: 15,
    topic: "Security",
    question: "A company observes an increase in Amazon EC2 costs in its most recent bill. The billing team notices unwanted vertical scaling of instance types for a couple of EC2 instances. A solutions architect needs to create a graph comparing the last 2 months of EC2 costs and perform an in-depth analysis to identify the root cause of the vertical scaling. How should the solutions architect generate the information with the LEAST operational overhead?",
    options: [
      "Use AWS Budgets to create a budget report and compare EC2 costs based on instance types.",
      "Use Cost Explorer's granular filtering feature to perform an in-depth analysis of EC2 costs based on instance types.",
      "Use graphs from the AWS Billing and Cost Management dashboard to compare EC2 costs based on instance types for the last 2 months.",
      "Use AWS Cost and Usage Reports to create a report and send it to an Amazon S3 bucket. Use Amazon QuickSight with Amazon S3 as a source to generate an interactive graph based on instance types."
    ],
    correctAnswer: 1,
    explanation: "AWS Cost Explorer has an easy-to-use interface that lets you visualize, understand, and manage your AWS costs and usage over time with granular filtering capabilities."
  },
  {
    id: 16,
    topic: "High Availability",
    question: "A company is designing an application. The application uses an AWS Lambda function to receive information through Amazon API Gateway and to store the information in an Amazon Aurora PostgreSQL database. During the proof-of-concept stage, the company has to increase the Lambda quotas significantly to handle the high volumes of data that the company needs to load into the database. A solutions architect must recommend a new design to improve scalability and minimize the configuration effort. Which solution will meet these requirements?",
    options: [
      "Refactor the Lambda function code to Apache Tomcat code that runs on Amazon EC2 instances. Connect the database by using native Java Database Connectivity (JDBC) drivers.",
      "Change the platform from Aurora to Amazon DynamoDB. Provision a DynamoDB Accelerator (DAX) cluster. Use the DAX client SDK to point the existing DynamoDB API calls at the DAX cluster.",
      "Set up two Lambda functions. Configure one function to receive the information. Configure the other function to load the information into the database. Integrate the Lambda functions by using Amazon Simple Notification Service (Amazon SNS).",
      "Set up two Lambda functions. Configure one function to receive the information. Configure the other function to load the information into the database. Integrate the Lambda functions by using an Amazon Simple Queue Service (Amazon SQS) queue."
    ],
    correctAnswer: 3,
    explanation: "Using SQS between two Lambda functions provides better scalability and decoupling. The queue acts as a buffer, allowing the receiving function to handle high volumes while the processing function can work at its own pace."
  },
  {
    id: 17,
    topic: "Networking",
    question: "A company needs to review its AWS Cloud deployment to ensure that its Amazon S3 buckets do not have unauthorized configuration changes. What should a solutions architect do to accomplish this goal?",
    options: [
      "Turn on AWS Config with the appropriate rules.",
      "Turn on AWS Trusted Advisor with the appropriate checks.",
      "Turn on Amazon Inspector with the appropriate assessment template.",
      "Turn on Amazon S3 server access logging. Configure Amazon EventBridge (Amazon CloudWatch Events)."
    ],
    correctAnswer: 0,
    explanation: "AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past."
  },
  {
    id: 18,
    topic: "Storage",
    question: "A company is launching a new application and will display application metrics on an Amazon CloudWatch dashboard. The company's product manager needs to access this dashboard periodically. The product manager does not have an AWS account. A solutions architect must provide access to the product manager by following the principle of least privilege. Which solution will meet these requirements?",
    options: [
      "Share the dashboard from the CloudWatch console. Enter the product manager's email address, and complete the sharing steps. Provide a shareable link for the dashboard to the product manager.",
      "Create an IAM user specifically for the product manager. Attach the CloudWatchReadOnlyAccess AWS managed policy to the user. Share the new login credentials with the product manager. Share the browser URL of the correct dashboard with the product manager.",
      "Create an IAM user for the company's employees. Attach the ViewOnlyAccess AWS managed policy to the IAM user. Share the new login credentials with the product manager. Ask the product manager to navigate to the CloudWatch console and locate the dashboard by name in the Dashboards section.",
      "Deploy a bastion server in a public subnet. When the product manager requires access to the dashboard, start the server and share the RDP credentials. On the bastion server, ensure that the weights browser is configured to open the URL of the dashboard."
    ],
    correctAnswer: 0,
    explanation: "CloudWatch dashboards can be shared with people who do not have direct access to your AWS account. This enables you to share dashboards across teams and with stakeholders."
  },
  {
    id: 19,
    topic: "Migration",
    question: "A company is migrating applications to AWS. The applications are deployed in different accounts. The company manages the accounts centrally by using AWS Organizations. The company's security team needs a single sign-on (SSO) solution across all the company's accounts. The company must continue managing the users and groups in its on-premises self-managed Microsoft Active Directory. Which solution will meet these requirements?",
    options: [
      "Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console. Create a one-way forest trust or a one-way domain trust to connect the company's self-managed Microsoft Active Directory with AWS SSO by using AWS Directory Service for Microsoft Active Directory.",
      "Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console. Create a two-way forest trust to connect the company's self-managed Microsoft Active Directory with AWS SSO by using AWS Directory Service for Microsoft Active Directory.",
      "Use AWS Directory Service. Create a two-way trust relationship with the company's self-managed Microsoft Active Directory.",
      "Deploy an identity provider (IdP) on premises. Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console."
    ],
    correctAnswer: 1,
    explanation: "AWS SSO with a two-way forest trust to AWS Managed Microsoft AD provides seamless SSO across all accounts while maintaining the on-premises Active Directory as the source of truth."
  },
  {
    id: 20,
    topic: "Database",
    question: "A company has a production workload that runs on 1,000 Amazon EC2 Linux instances. The workload is powered by third-party software. The company needs to patch the third-party software on all EC2 instances as quickly as possible to remediate a critical security vulnerability. What should a solutions architect do to meet these requirements?",
    options: [
      "Create an AWS Lambda function to apply the patch to all EC2 instances.",
      "Configure AWS Systems Manager Patch Manager to apply the patch to all EC2 instances.",
      "Schedule an AWS Systems Manager maintenance window to apply the patch to all EC2 instances.",
      "Use AWS Systems Manager Run Command to run a custom command that applies the patch to all EC2 instances."
    ],
    correctAnswer: 3,
    explanation: "AWS Systems Manager Run Command lets you remotely and securely manage the configuration of your managed instances at scale. It's the fastest way to apply patches across many instances."
  },
  {
    id: 21,
    topic: "Compute",
    question: "A company is developing an application that provides order shipping statistics for retrieval by a REST API. The company wants to extract the shipping statistics, organize the data into an easy-to-read HTML format, and send the report to several email addresses at the same time every morning. Which combination of steps should a solutions architect take to meet these requirements? (Choose two.)",
    options: [
      "Configure the application to send the data to Amazon Kinesis Data Firehose.",
      "Use Amazon Simple Email Service (Amazon SES) to format the data and to send the report by email.",
      "Create an Amazon EventBridge (Amazon CloudWatch Events) scheduled event that invokes an AWS Glue job to query the application's API for the data.",
      "Create an Amazon EventBridge (Amazon CloudWatch Events) scheduled event that invokes an AWS Lambda function to query the application's API for the data.",
      "Store the application data in Amazon S3. Create an Amazon Simple Notification Service (Amazon SNS) topic as an S3 event destination to send the report by email."
    ],
    correctAnswer: 3,
    explanation: "EventBridge scheduled events with Lambda for data retrieval and SES for email formatting and sending is the most efficient combination for this use case."
  },
  {
    id: 22,
    topic: "Security",
    question: "A company wants to migrate its on-premises application to AWS. The application produces output files that vary in size from tens of gigabytes to hundreds of terabytes. The application data must be stored in a standard file system structure. The company wants a solution that scales automatically, is highly available, and requires minimum operational overhead. Which solution will meet these requirements?",
    options: [
      "Migrate the application to run as containers on Amazon Elastic Container Service (Amazon ECS). Use Amazon S3 for storage.",
      "Migrate the application to run as containers on Amazon Elastic Kubernetes Service (Amazon EKS). Use Amazon Elastic Block Store (Amazon EBS) for storage.",
      "Migrate the application to Amazon EC2 instances in a Multi-AZ Auto Scaling group. Use Amazon Elastic File System (Amazon EFS) for storage.",
      "Migrate the application to Amazon EC2 instances in a Multi-AZ Auto Scaling group. Use Amazon Elastic Block Store (Amazon EBS) for storage."
    ],
    correctAnswer: 2,
    explanation: "Amazon EFS provides a simple, scalable, fully managed elastic NFS file system that automatically grows and shrinks as you add and remove files."
  },
  {
    id: 23,
    topic: "Networking",
    question: "A company needs to store its accounting records in Amazon S3. The records must be immediately accessible for 1 year and then must be archived for an additional 9 years. No one at the company, including administrative users and root users, can be able to delete the records during the entire 10-year period. The records must be stored with maximum resiliency. Which solution will meet these requirements?",
    options: [
      "Store the records in S3 Glacier for the entire 10-year period. Use an access control policy to deny deletion of the records for a period of 10 years.",
      "Store the records by using S3 Intelligent-Tiering. Use an IAM policy to deny deletion of the records. After 10 years, change the IAM policy to allow deletion.",
      "Use an S3 Lifecycle policy to transition the records from S3 Standard to S3 Glacier Deep Archive after 1 year. Use S3 Object Lock in compliance mode for a period of 10 years.",
      "Use an S3 Lifecycle policy to transition the records from S3 Standard to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 1 year. Use S3 Object Lock in governance mode for a period of 10 years."
    ],
    correctAnswer: 2,
    explanation: "S3 Object Lock in compliance mode prevents any user, including the root user, from deleting objects. Combined with lifecycle policies for cost optimization, this meets all requirements."
  },
  {
    id: 24,
    topic: "High Availability",
    question: "A company runs multiple Windows workloads on AWS. The company's employees use Windows file shares that are hosted on two Amazon EC2 Windows instances. The file shares synchronize data between themselves and maintain duplicate copies. The company wants a highly available and durable storage solution that preserves how users currently access the files. What should a solutions architect do to meet these requirements?",
    options: [
      "Migrate all the data to Amazon S3. Set up IAM authentication for users to access files.",
      "Set up an Amazon S3 File Gateway. Mount the S3 File Gateway on the existing EC2 instances.",
      "Extend the file share environment to Amazon FSx for Windows File Server with a Multi-AZ configuration. Migrate all the data to FSx for Windows File Server.",
      "Extend the file share environment to Amazon Elastic File System (Amazon EFS) with a Multi-AZ configuration. Migrate all the data to Amazon EFS."
    ],
    correctAnswer: 2,
    explanation: "Amazon FSx for Windows File Server provides fully managed Windows file servers with native Windows compatibility, Multi-AZ for high availability, and seamless integration with existing Windows environments."
  },
  {
    id: 25,
    topic: "Storage",
    question: "A solutions architect is developing a VPC architecture that includes multiple subnets. The architecture will host applications that use Amazon EC2 instances and Amazon RDS DB instances. The architecture consists of six subnets in two Availability Zones. Each Availability Zone includes a public subnet, a private subnet, and a dedicated subnet for databases. Only EC2 instances that run in the private subnets can have access to the RDS databases. Which solution will meet these requirements?",
    options: [
      "Create a new route table that excludes the route to the public subnets' CIDR blocks. Associate the route table with the database subnets.",
      "Create a security group that denies inbound traffic from the security group that is assigned to instances in the public subnets. Attach the security group to the DB instances.",
      "Create a security group that allows inbound traffic from the security group that is assigned to instances in the private subnets. Attach the security group to the DB instances.",
      "Create a new peering connection between the public subnets and the private subnets. Create a different peering connection between the private subnets and the database subnets."
    ],
    correctAnswer: 2,
    explanation: "Security groups act as virtual firewalls. By creating a security group that only allows inbound traffic from the private subnet instances' security group, you ensure only those instances can access the databases."
  },
  {
    id: 26,
    topic: "Security",
    question: "A company has an application that runs on Amazon EC2 instances and uses an Amazon Aurora database. The EC2 instances connect to the database by using user names and passwords that are stored locally in a file. The company wants to minimize the operational overhead of credential management. What should a solutions architect do to accomplish this goal?",
    options: [
      "Use AWS Secrets Manager and attach an IAM role that grants access to that secret to the EC2 instances that need it. Turn on automatic rotation.",
      "Use AWS Systems Manager Parameter Store with the SecureString parameter type. Attach an IAM role that grants access to the parameter to the EC2 instances.",
      "Create an encrypted Amazon Elastic Block Store (Amazon EBS) volume for each EC2 instance. Attach the new EBS volume to each EC2 instance. Migrate the credential file to the new EBS volume.",
      "Create an encrypted Amazon S3 bucket. Migrate the credential file to the S3 bucket. Point the application to the S3 bucket."
    ],
    correctAnswer: 0,
    explanation: "AWS Secrets Manager is a secrets management service that helps you protect access to your applications, services, and IT resources. It enables you to rotate, manage, and retrieve database credentials throughout their lifecycle."
  },
  {
    id: 27,
    topic: "Networking",
    question: "A global company hosts its web application on Amazon EC2 instances behind an Application Load Balancer (ALB). The web application has static data and dynamic data. The company stores its static data in an Amazon S3 bucket. The company wants to improve performance and reduce latency for the static data and dynamic data. The company is using its own domain name registered with Amazon Route 53. What should a solutions architect do to meet these requirements?",
    options: [
      "Create an Amazon CloudFront distribution that has the S3 bucket and the ALB as origins. Configure Route 53 to route traffic to the CloudFront distribution.",
      "Create an Amazon CloudFront distribution that has the ALB as an origin. Create an AWS Global Accelerator standard accelerator that has the S3 bucket as an endpoint. Configure Route 53 to route traffic to the distribution.",
      "Create an Amazon CloudFront distribution that has the S3 bucket as an origin. Create an AWS Global Accelerator standard accelerator that has the ALB and the CloudFront distribution as endpoints. Create a custom domain name that points to the accelerator DNS name.",
      "Create an Amazon CloudFront distribution that has the ALB as an origin. Create an AWS Global Accelerator standard accelerator that has the CloudFront distribution as an endpoint. Create two domain names. Point one domain name to the accelerator DNS name for dynamic content. Point the other domain name to the CloudFront DNS name for static content."
    ],
    correctAnswer: 0,
    explanation: "CloudFront with Multiple Origins allows you to set up both the ALB (for dynamic content) and the S3 bucket (for static content) as origins. This means both your dynamic and static content can be served through CloudFront, which will cache content at edge locations to reduce latency."
  },
  {
    id: 28,
    topic: "Database",
    question: "A company performs monthly maintenance on its AWS infrastructure. During these maintenance activities, the company needs to rotate the credentials for its Amazon RDS for MySQL databases across multiple AWS Regions. Which solution will meet these requirements with the LEAST operational overhead?",
    options: [
      "Store the credentials as secrets in AWS Secrets Manager. Use multi-Region secret replication for the required Regions. Configure Secrets Manager to rotate the secrets on a schedule.",
      "Store the credentials as secrets in AWS Secrets Manager in each Region. Configure Secrets Manager to rotate the secrets on a schedule.",
      "Store the credentials in a parameter in AWS Systems Manager Parameter Store in each Region. Configure Parameter Store to rotate the credentials on a schedule.",
      "Store the credentials in a parameter in AWS Systems Manager Parameter Store. Use multi-Region parameter replication for the required Regions. Configure Parameter Store to rotate the credentials on a schedule."
    ],
    correctAnswer: 0,
    explanation: "AWS Secrets Manager allows you to store, manage, and rotate secrets across multiple AWS Regions. By enabling multi-Region secret replication, you can replicate the secrets across the required Regions for seamless rotation."
  },
  {
    id: 29,
    topic: "Compute",
    question: "A company runs an ecommerce application on Amazon EC2 instances behind an Application Load Balancer. The instances run in an Amazon EC2 Auto Scaling group across multiple Availability Zones. The Auto Scaling group scales based on CPU utilization metrics. The ecommerce application stores the transaction data in a MySQL 8.0 database that is hosted on a large EC2 instance. The database's performance degrades quickly as application load increases. The application handles more read requests than write transactions. The company wants a solution that will automatically scale the database to meet the demand of unpredictable read workloads while maintaining high availability. Which solution will meet these requirements?",
    options: [
      "Use Amazon Redshift with a single node for leader and compute functionality.",
      "Use Amazon RDS with a Single-AZ deployment. Configure Amazon RDS to add reader instances in a different Availability Zone.",
      "Use Amazon Aurora with a Multi-AZ deployment. Configure Aurora Auto Scaling with Aurora Replicas.",
      "Use Amazon ElastiCache for Memcached with EC2 Spot Instances."
    ],
    correctAnswer: 2,
    explanation: "Amazon Aurora with Multi-AZ deployment and Aurora Auto Scaling with Aurora Replicas provides high performance and scalability. Aurora Auto Scaling allows the database to automatically add or remove Aurora Replicas based on the workload."
  },
  {
    id: 30,
    topic: "Security",
    question: "A company recently migrated to AWS and wants to implement a solution to protect the traffic that flows in and out of the production VPC. The company had an inspection server in its on-premises data center. The inspection server performed specific operations such as traffic flow inspection and traffic filtering. The company wants to have the same functionalities in the AWS Cloud. Which solution will meet these requirements?",
    options: [
      "Use Amazon GuardDuty for traffic inspection and traffic filtering in the production VPC.",
      "Use Traffic Mirroring to mirror traffic from the production VPC for traffic inspection and filtering.",
      "Use AWS Network Firewall to create the required rules for traffic inspection and traffic filtering for the production VPC.",
      "Use AWS Firewall Manager to create the required rules for traffic inspection and traffic filtering for the production VPC."
    ],
    correctAnswer: 2,
    explanation: "AWS Network Firewall is a managed firewall service that provides filtering for both inbound and outbound network traffic. It allows you to create rules for traffic inspection and filtering to protect your production VPC."
  },
  {
    id: 31,
    topic: "Analytics",
    question: "A company hosts a data lake on AWS. The data lake consists of data in Amazon S3 and Amazon RDS for PostgreSQL. The company needs a reporting solution that provides data visualization and includes all the data sources within the data lake. Only the company's management team should have full access to all the visualizations. The rest of the company should have only limited access. Which solution will meet these requirements?",
    options: [
      "Create an analysis in Amazon QuickSight. Connect all the data sources and create new datasets. Publish dashboards to visualize the data. Share the dashboards with the appropriate IAM roles.",
      "Create an analysis in Amazon QuickSight. Connect all the data sources and create new datasets. Publish dashboards to visualize the data. Share the dashboards with the appropriate users and groups.",
      "Create an AWS Glue table and crawler for the data in Amazon S3. Create an AWS Glue extract, transform, and load (ETL) job to produce reports. Publish the reports to Amazon S3. Use S3 bucket policies to limit access to the reports.",
      "Create an AWS Glue table and crawler for the data in Amazon S3. Use Amazon Athena Federated Query to access data within Amazon RDS for PostgreSQL. Generate reports by using Amazon Athena. Publish the reports to Amazon S3. Use S3 bucket policies to limit access to the reports."
    ],
    correctAnswer: 1,
    explanation: "Amazon QuickSight is a business intelligence tool for data visualization and reporting. You can connect all data sources, create datasets, and publish dashboards with appropriate user and group access controls."
  },
  {
    id: 32,
    topic: "Storage",
    question: "A company is implementing a new business application. The application runs on two Amazon EC2 instances and uses an Amazon S3 bucket for document storage. A solutions architect needs to ensure that the EC2 instances can access the S3 bucket. What should the solutions architect do to meet this requirement?",
    options: [
      "Create an IAM role that grants access to the S3 bucket. Attach the role to the EC2 instances.",
      "Create an IAM policy that grants access to the S3 bucket. Attach the policy to the EC2 instances.",
      "Create an IAM group that grants access to the S3 bucket. Attach the group to the EC2 instances.",
      "Create an IAM user that grants access to the S3 bucket. Attach the user credentials to the EC2 instances."
    ],
    correctAnswer: 0,
    explanation: "An IAM role is an AWS resource that allows you to delegate access to AWS resources and services. You can create an IAM role that grants access to the S3 bucket and then attach the role to the EC2 instances."
  },
  {
    id: 33,
    topic: "Compute",
    question: "An application development team is designing a microservice that will convert large images to smaller, compressed images. When a user uploads an image through the web interface, the microservice should store the image in an Amazon S3 bucket, process and compress the image with an AWS Lambda function, and store the image in its compressed form in a different S3 bucket. A solutions architect needs to design a solution that uses durable, stateless components to process the images automatically. Which combination of actions will meet these requirements?",
    options: [
      "Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure the S3 bucket to send a notification to the SQS queue when an image is uploaded. Configure the Lambda function to use the SQS queue as the invocation source.",
      "Configure the S3 bucket to send a notification to the Lambda function when an image is uploaded. Configure the Lambda function to use Amazon Simple Email Service (Amazon SES) to send a notification when processing is complete.",
      "Configure the S3 bucket to send a notification to an Amazon Simple Notification Service (Amazon SNS) topic when an image is uploaded. Subscribe the Lambda function to the SNS topic.",
      "Create an Amazon EventBridge rule that monitors the S3 bucket for new uploads. Configure the rule to invoke the Lambda function when a new image is detected."
    ],
    correctAnswer: 0,
    explanation: "Creating an SQS queue and configuring the S3 bucket to send notifications to it establishes a durable and scalable way to handle incoming image processing tasks. The Lambda function can then process messages from the queue."
  },
  {
    id: 34,
    topic: "High Availability",
    question: "A company has a production workload that runs on 1,000 Amazon EC2 Linux instances. The workload is powered by third-party software. The company needs to patch the third-party software on all EC2 instances as quickly as possible to remediate a critical security vulnerability. What should a solutions architect do to meet these requirements?",
    options: [
      "Create an AWS Lambda function to apply the patch to all EC2 instances.",
      "Configure AWS Systems Manager Patch Manager to apply the patch to all EC2 instances.",
      "Schedule an AWS Systems Manager maintenance window to apply the patch to all EC2 instances.",
      "Use AWS Systems Manager Run Command to run a custom command that applies the patch to all EC2 instances."
    ],
    correctAnswer: 3,
    explanation: "AWS Systems Manager Run Command lets you remotely and securely manage the configuration of your managed instances at scale. It's the fastest way to apply patches across many instances."
  },
  {
    id: 35,
    topic: "Migration",
    question: "A company wants to run its critical applications in containers to meet requirements for scalability and availability. The company prefers to focus on maintenance of the critical applications. The company does not want to be responsible for provisioning and managing the underlying infrastructure that runs the containerized workload. What should a solutions architect do to meet these requirements?",
    options: [
      "Use Amazon EC2 instances, and install Docker on the instances.",
      "Use Amazon Elastic Container Service (Amazon ECS) on Amazon EC2 worker nodes.",
      "Use Amazon Elastic Container Service (Amazon ECS) on AWS Fargate.",
      "Use Amazon EC2 instances from an Amazon Elastic Container Service (Amazon ECS)-optimized Amazon Machine Image (AMI)."
    ],
    correctAnswer: 2,
    explanation: "Amazon ECS on AWS Fargate is a serverless compute engine for containers. With Fargate, you don't need to provision, configure, or scale clusters of virtual machines to run containers."
  }
];

