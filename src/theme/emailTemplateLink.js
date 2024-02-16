export function htmlContent(link, email, formattedDateString) {
  const BASE_URL = process.env.NEXTAUTH_URL;

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">
   <head></head>
   <body style="background-color:#ffffff;margin:0 auto;padding:1rem;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto">
         <tr style="width:100%">
            <td>
               <h5 style="color:#1d1c1d;font-size:24px;margin:30px 0;padding:0;line-height:42px">Verify your email address</h5>
               <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300"><strong><a href="mailto:${email}" target="_blank">${email}</a></strong></p>
               <p style="font-size:16px;line-height:28px;margin:16px 0;margin-bottom:30px">Your link is valid for 5 minutes till ${formattedDateString}.
               <br>
               After that, you will need to resend the verification email.</p>
               <div><a href="${link}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Verify Email</a></div>
               <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">If you didn&#x27;t request this email, there&#x27;s nothing to worry about - you can safely ignore it.</p>
               <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table width="100%" style="margin-bottom:32px;padding-left:8px;padding-right:8px;width:100%" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                              <tbody style="width:100%">
                                 <tr style="width:100%">
                                    <td style="width:66%"><img alt="JWtours" src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1703597983/jwtours/logo/JWtours_ajsugs_mmxn9k.png" width="240" height="60" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                                    <td>
                                       <table width="100%" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                                          <tbody style="width:100%">
                                             <tr style="width:100%">
                                                <td><a target="_blank" style="color:#067df7;text-decoration:none" href="/"><img alt="JWtours" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-twitter.png" width="32" height="32" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" /></a></td>
                                                <td><a target="_blank" style="color:#067df7;text-decoration:none" href="/"><img alt="JWtours" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-facebook.png" width="32" height="32" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" /></a></td>
                                                <td><a target="_blank" style="color:#067df7;text-decoration:none" href="/"><img alt="JWtours" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/slack-linkedin.png" width="32" height="32" style="display:inline;outline:none;border:none;text-decoration:none;margin-left:32px" /></a></td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <a target="_blank" style="color:#b7b7b7;text-decoration:underline" href="${BASE_URL}/blog" rel="noopener noreferrer">Our blog</a>   |   <a target="_blank" style="color:#b7b7b7;text-decoration:underline" href="${BASE_URL}/legal/privacy-policy" rel="noopener noreferrer">Policies</a>   |   <a target="_blank" style="color:#b7b7b7;text-decoration:underline" href="${BASE_URL}/help" rel="noopener noreferrer">Help center</a>   |   <a target="_blank" style="color:#b7b7b7;text-decoration:underline" href="${BASE_URL}/community" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="6">JWtours Community</a>
                           <p style="font-size:12px;line-height:15px;margin:16px 0;color:#b7b7b7;text-align:left;margin-bottom:50px">©2023 JWtours, LLC, <br />500 Howard Street, San Francisco, CA 94105, USA <br /><br />All rights reserved.</p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </table>
   </body>
</html>
`;
}
