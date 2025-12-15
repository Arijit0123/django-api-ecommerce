from django.urls import path
from courses.views import CourseListCreateView, CourseDetailView, CourseUpdateView, CourseDeleteView

urlpatterns = [
    path('', CourseListCreateView.as_view(), name='Course-List-Create'), #POST
    # path('', CourseListView.as_view(),name='Course-list'), #GET
    path('<int:pk>/', CourseDetailView.as_view(),name='Course-Detail'), #GET
    path('<int:pk>/update', CourseUpdateView.as_view(),name='Course-Update'), #PUT, PATCH
    path('<int:pk>/delete', CourseDeleteView.as_view(),name='Course-delete'), #Delete
]