import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackProps, aws_s3 as s3 } from 'aws-cdk-lib';
import { DeploymentTarget } from '../config/deployment';
import { APP_NAME } from '../config/constants';

interface EssentiallyBackendS3StackProps extends StackProps {
  target: DeploymentTarget;
}

export const ESSENTIALLY_BACKEND_S3_STACK_NAME =
  APP_NAME.PREFIX.concat('S3Stack');

export class EssentiallyBackendS3Stack extends cdk.Stack {
  public testBucket: s3.Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: EssentiallyBackendS3StackProps
  ) {
    super(scope, id, props);

    this.testBucket = new s3.Bucket(
      this,
      APP_NAME.PREFIX.concat('TestBucket'),
      {
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
      }
    );
  }
}
