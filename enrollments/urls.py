from django.urls import path
from enrollments.views import ApproveEnrollmentView, CourseEnrollmentListView,EnrollmentRequestView,MyEnrollmentView, RejectEnrollmentView

urlpatterns = [
    path('request/', EnrollmentRequestView.as_view(), name='enrollment-request'),
    path('my/', MyEnrollmentView.as_view(), name='my-enrollments'),
    path('course/<int:course_id>/', CourseEnrollmentListView.as_view(), name='course-enrollments'),
    path('<int:pk>/approve/', ApproveEnrollmentView.as_view(), name='approve-enrollment'),
    path('<int:pk>/reject/', RejectEnrollmentView.as_view(), name='reject-enrollment'),
]