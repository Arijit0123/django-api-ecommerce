from django.urls import path
from events import views

urlpatterns = [
    # EVENTS
    path('', views.EventListCreateView.as_view(), name='event-list'),
    # path('create/', views.EventCreateView.as_view(), name='event-create'),
    path('<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),

    # COMMENTS
    path('<int:event_id>/comments/', views.CommentListView.as_view(), name='comment-list'),
    path('comments/create/', views.CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/delete/', views.CommentDeleteView.as_view(), name='comment-delete'),
]
