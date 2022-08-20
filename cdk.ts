import { App, Stack, StackProps } from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class AwsLambdaStack extends Stack {
  constructor(scope: any, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "WaitlistHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("dist"),
      handler: "index.default",
    });

    new apigateway.LambdaRestApi(this, "WaitlistApi", {
      handler,
      proxy: true,
    });
  }
}

new AwsLambdaStack(new App(), "WaitlistStack", {});
