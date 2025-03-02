module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      ssl: true,
      tls: true,

      auth: {
        user: env('GMAIL_USER'),
        pass: env('GMAIL_PASS'),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: 'noreply@character-diversion.com',
      defaultReplyTo: 'nonreply@character-diversion.com',
    },
  },
  upload: {
    enabled: true,
  },
});
