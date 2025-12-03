from django.urls import path
from assignments.views import (
    AssignmentCreateView, 
    AssignmentListView, 
    AssignmentDetailView, 
    SubmissionCreateView, 
    SubmissionListView, 
    SubmissionGradeView,
)

urlpatterns = [
    # Assignment URLs
    path('', AssignmentListView.as_view(), name='assignment-list'),
    path('create/', AssignmentCreateView.as_view(), name='assignment-create'),
    path('<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),

    # Submission URLs
    path('submissions/', SubmissionListView.as_view(), name='submission-list'),
    path('submissions/create/', SubmissionCreateView.as_view(), name='submission-create'),
    path('submissions/<int:pk>/grade/', SubmissionGradeView.as_view(), name='submission-grade'),
]

