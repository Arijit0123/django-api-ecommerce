from django.core.mail import send_mail

def send_enrollment_email(subject,message,to_email):
    send_mail(
        subject,
        message,
        'CampusConnect <noreply@campusconnect.com>',
        [to_email],
        fail_silently=False,
    )