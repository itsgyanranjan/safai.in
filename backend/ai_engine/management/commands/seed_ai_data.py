import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model
from complaints.models import Complaint
from ai_engine.services import detect_hotspots, calculate_cleanliness_score, generate_admin_recommendations, generate_weekly_report

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds realistic complaint data across wards to demonstrate AI Hotspot detection, Ward Scores, and Recommendations'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("Starting AI seed data generator..."))

        # Get or create dummy user
        user, created = User.objects.get_or_create(
            email="citizen_seed@safai.gov.in",
            defaults={'name': 'Citizen Reporter', 'role': 'CITIZEN'}
        )
        if created:
            user.set_password('safai123')
            user.save()

        wards_data = [
            {'ward': 'Vijay Nagar', 'count': 42, 'high_pct': 0.4, 'main_cat': 'Garbage Accumulation', 'lat': 22.7533, 'lon': 75.8937},
            {'ward': 'Patia', 'count': 38, 'high_pct': 0.35, 'main_cat': 'Overflowing Dustbin', 'lat': 20.3588, 'lon': 85.8333},
            {'ward': 'Master Canteen', 'count': 35, 'high_pct': 0.3, 'main_cat': 'Street Cleaning', 'lat': 20.2644, 'lon': 85.8398},
            {'ward': 'Rajwada', 'count': 22, 'high_pct': 0.2, 'main_cat': 'Open Dumping', 'lat': 22.7196, 'lon': 75.8577},
            {'ward': 'Saheed Nagar', 'count': 18, 'high_pct': 0.15, 'main_cat': 'Missed Waste Collection', 'lat': 20.2897, 'lon': 85.8437},
            {'ward': 'Palasia', 'count': 8, 'high_pct': 0.05, 'main_cat': 'Street Cleaning', 'lat': 22.7244, 'lon': 75.8839},
            {'ward': 'Khandagiri', 'count': 5, 'high_pct': 0.0, 'main_cat': 'Garbage Accumulation', 'lat': 20.2582, 'lon': 85.7820},
        ]

        categories = [
            'Garbage Accumulation', 'Overflowing Dustbin', 'Street Cleaning',
            'Missed Waste Collection', 'Open Dumping', 'Other'
        ]

        statuses = ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED']
        now = timezone.now()

        created_count = 0
        for wdata in wards_data:
            ward_name = wdata['ward']
            for i in range(wdata['count']):
                days_ago = random.randint(0, 13)
                hours_ago = random.randint(0, 23)
                created_dt = now - timedelta(days=days_ago, hours=hours_ago)

                cat = wdata['main_cat'] if random.random() < 0.6 else random.choice(categories)
                priority = 'HIGH' if random.random() < wdata['high_pct'] else random.choice(['MEDIUM', 'LOW'])
                status_val = random.choices(statuses, weights=[30, 20, 20, 30])[0]

                # Slight coord jitter
                lat_jitter = wdata['lat'] + (random.uniform(-0.005, 0.005))
                lon_jitter = wdata['lon'] + (random.uniform(-0.005, 0.005))

                comp = Complaint.objects.create(
                    category=cat,
                    description=f"Automated AI report for {cat} near {ward_name} block {random.randint(1, 12)}. Foul odor and waste blockage reported by residents.",
                    address=f"Street {random.randint(1, 45)}, {ward_name}",
                    ward=ward_name,
                    latitude=round(lat_jitter, 6),
                    longitude=round(lon_jitter, 6),
                    priority=priority,
                    status=status_val,
                    reported_by=user
                )
                comp.created_at = created_dt
                comp.save()
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully generated {created_count} complaints across 7 wards."))

        # Trigger AI Service computations to populate cache/models
        self.stdout.write("Calculating AI Hotspots...")
        detect_hotspots()

        self.stdout.write("Generating AI Cleanliness Scores...")
        calculate_cleanliness_score()

        self.stdout.write("Generating AI Recommendations...")
        generate_admin_recommendations()

        self.stdout.write("Generating Weekly AI Report...")
        generate_weekly_report()

        self.stdout.write(self.style.SUCCESS("AI seed data generation complete!"))
