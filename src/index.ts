import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as sendgrid from "@sendgrid/mail";
import * as z from "zod";

const contact = z.object({
  email: z.string(),
  waitlist: z.string(),
});

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
  event
) => {
  try {
    const body = JSON.parse(event.body as string);
    const { email, waitlist } = contact.parse(body);
    const msg = {
      to: "tatethurston@gmail.com",
      from: "tatethurston@gmail.com",
      subject: "waitlist",
      text: `${waitlist}\n${email}`,
    };
    await sendgrid.send(msg);
  } catch (e) {
    console.error(JSON.stringify(e));
    return { statusCode: 500, body: JSON.stringify({ success: false }) };
  }
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};

export default handler;
