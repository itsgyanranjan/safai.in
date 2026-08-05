from django.contrib import admin
from .models import CleanupDrive, DriveRegistration

@admin.register(CleanupDrive)
class CleanupDriveAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'date', 'time', 'max_participants', 'participant_count')
    search_fields = ('title', 'location')

@admin.register(DriveRegistration)
class DriveRegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'cleanup_drive', 'registered_at')
