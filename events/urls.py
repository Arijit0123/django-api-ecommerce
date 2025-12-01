from django.urls import path
from events import views

urlpatterns = [
    # Event Endpoints
    path('events/', views.EventListView.as_view(), name='event-list'),
    path('events/create/', views.EventCreateView.as_view(), name='event-create'),
    path('events/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),

    # Comment Endpoints
    path('events/<int:event_id>/comments/', views.CommentListView.as_view(), name='comment-list'),
    path('comments/create/', views.CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/delete/', views.CommentDeleteView.as_view(), name='comment-delete'),
]
