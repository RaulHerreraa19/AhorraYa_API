import sgMail from '@sendgrid/mail'
import { Response } from '../common/types'
import { typeOfResponse } from '../common/enums'

export const senderMail = async (toEmail: string): Promise<Response> => {
  const response: Response = { typeOfResponse: typeOfResponse.ERROR, message: '' }
  const apikey = process.env.SENDGRID_API_KEY != null ? process.env.SENDGRID_API_KEY : ''
  sgMail.setApiKey(apikey)

  const message = {
    to: toEmail,
    from: 'your-email@example.com',
    subject: 'Password Reset Request',
    text: 'You requested a password reset. Click the link below to reset your password.',
    html: '<strong>Please click <a href="http://example.com/reset-password">here</a> to reset your password.</strong>'
  }
  try {
    await sgMail.send(message)
    response.typeOfResponse = typeOfResponse.SUCCESS
    response.message = 'Email sent successfully'
  } catch (error) {
    console.error('Error sending email:', error)
    response.typeOfResponse = typeOfResponse.ERROR
    response.message = 'Error sending email'
  }
  return response
}

export const senderMailToRecoverPassword = async (): Promise<Response> => {
  const response: Response = { typeOfResponse: typeOfResponse.ERROR, message: '' }

  return response
}
