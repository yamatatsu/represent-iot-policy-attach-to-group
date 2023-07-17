import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as aws_iot from "aws-cdk-lib/aws-iot";

const app = new cdk.App();
const stack = new cdk.Stack(app, "represent-iot-policy-attach-to-group");

const group = new aws_iot.CfnThingGroup(stack, "Group");

const policy = new aws_iot.CfnPolicy(stack, "Policy", {
  policyName: "represent-iot-policy",
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["iot:Publish"],
        Resource: ["*"],
      },
    ],
  },
});

new aws_iot.CfnPolicyPrincipalAttachment(stack, "PolicyAttachment", {
  policyName: policy.policyName!,
  principal: group.attrArn,
});
