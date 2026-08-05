from django.core.management.base import BaseCommand
from awareness.models import Campaign, EducationalPoster, EnvironmentalTip, QuizQuestion, Article
from cleanup_drives.models import CleanupDrive, Certificate
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds initial Awareness Hub content and sample certificates'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding Awareness Hub data...")

        # 1. Campaigns
        Campaign.objects.get_or_create(
            title="Plastic-Free Week 2026",
            defaults={
                'description': "Join municipal authorities in eliminating single-use plastics across market zones in Bhubaneswar. Bring cloth bags and spread awareness!",
                'location': "Saheed Nagar & Master Canteen Markets",
                'duration': "7 Days (Aug 5 - Aug 12)",
                'banner_url': "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
                'participants_count': 240
            }
        )

        Campaign.objects.get_or_create(
            title="Daya River Cleanup Drive",
            defaults={
                'description': "A mass community mobilization campaign to clear plastic waste and riverbank trash along Daya River bank precincts.",
                'location': "Daya River Bank, Old Town Zone",
                'duration': "Weekend Drive (Aug 8 - Aug 9)",
                'banner_url': "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
                'participants_count': 185
            }
        )

        Campaign.objects.get_or_create(
            title="Green School Swachhata Drive",
            defaults={
                'description': "Educating students on source waste segregation, composting, and zero-waste campus practices across 15 municipal schools.",
                'location': "Vijay Nagar & Patia Schools",
                'duration': "14 Days Campaign",
                'banner_url': "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
                'participants_count': 320
            }
        )

        Campaign.objects.get_or_create(
            title="No Plastic Market Movement",
            defaults={
                'description': "Promoting biodegradable packaging and eco-friendly bags among local vegetable vendors and shopkeepers.",
                'location': "Rajwada Central Market",
                'duration': "Ongoing Monthly Drive",
                'banner_url': "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
                'participants_count': 150
            }
        )

        # 2. Educational Posters
        EducationalPoster.objects.get_or_create(
            title="Source Waste Segregation Guide (Wet vs Dry)",
            defaults={
                'description': "Official municipal infographic showing how to separate organic kitchen waste (green bin) from recyclable plastics and paper (blue bin).",
                'category': "Waste Segregation",
                'image_url': "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
                'download_count': 142
            }
        )

        EducationalPoster.objects.get_or_create(
            title="Say NO to Single-Use Plastics Poster",
            defaults={
                'description': "High-resolution downloadable poster highlighting eco-friendly alternatives to plastic cutlery, straws, and shopping bags.",
                'category': "Plastic Ban",
                'image_url': "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80",
                'download_count': 98
            }
        )

        EducationalPoster.objects.get_or_create(
            title="Home Composting 101 Infographic",
            defaults={
                'description': "Step-by-step guide to converting kitchen vegetable scraps into nutrient-rich organic fertilizer for balcony gardens.",
                'category': "Composting",
                'image_url': "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
                'download_count': 115
            }
        )

        # 3. Environmental Tips
        EnvironmentalTip.objects.get_or_create(
            title="Separate Wet & Dry Waste at Source",
            defaults={
                'category': "Waste Segregation",
                'tip_text': "Use green bins for biodegradable kitchen food scraps and blue bins for paper, plastic, metal, and dry packaging.",
                'icon_name': "Trash2"
            }
        )

        EnvironmentalTip.objects.get_or_create(
            title="Always Carry a Reusable Cloth Bag",
            defaults={
                'category': "Plastic Avoidance",
                'tip_text': "Keep a lightweight cloth or jute tote bag in your vehicle or backpack for daily market grocery shopping.",
                'icon_name': "ShoppingBag"
            }
        )

        EnvironmentalTip.objects.get_or_create(
            title="Utilize Designated Municipal Dustbins",
            defaults={
                'category': "Public Cleanliness",
                'tip_text': "Never litter wrappers or bottles in open streets or vacant plots. Deposit waste in nearby smart public bins.",
                'icon_name': "MapPin"
            }
        )

        EnvironmentalTip.objects.get_or_create(
            title="Plant Native Trees & Garden Shrubs",
            defaults={
                'category': "Greenery",
                'tip_text': "Planting neem, banyan, or balcony flowering plants improves urban air quality and absorbs stormwater runoff.",
                'icon_name': "Leaf"
            }
        )

        EnvironmentalTip.objects.get_or_create(
            title="Reduce Food Waste & Donate Surplus",
            defaults={
                'category': "Food Management",
                'tip_text': "Plan weekly meal portions carefully to minimize cooked food wastage. Share surplus untouched food with community shelters.",
                'icon_name': "Heart"
            }
        )

        # 4. Quiz Questions
        QuizQuestion.objects.get_or_create(
            question="Which colored bin is designated for biodegradable wet waste in municipal collection?",
            defaults={
                'option_a': "Green Bin",
                'option_b': "Blue Bin",
                'option_c': "Red Bin",
                'option_d': "Yellow Bin",
                'correct_option': "A",
                'explanation': "Green bins are universally used for organic wet waste like food scraps, tea leaves, and garden leaves.",
                'reward_points': 20
            }
        )

        QuizQuestion.objects.get_or_create(
            question="What is the recommended practice for disposing of electronic waste (E-Waste)?",
            defaults={
                'option_a': "Burn it in open air",
                'option_b': "Drop off at designated E-Waste collection centers",
                'option_c': "Mix with daily kitchen garbage",
                'option_d': "Dump in nearby storm drains",
                'correct_option': "B",
                'explanation': "E-waste contains heavy metals and should always be handed over to authorized recycling e-waste collection centers.",
                'reward_points': 20
            }
        )

        QuizQuestion.objects.get_or_create(
            question="How long does a single-use plastic bottle take to decompose in landfills?",
            defaults={
                'option_a': "1 to 2 years",
                'option_b': "10 to 20 years",
                'option_c': "Approx. 450 years",
                'option_d': "It decomposes overnight",
                'correct_option': "C",
                'explanation': "PET plastic bottles break down into microplastics over roughly 450 years, causing long-term soil toxicity.",
                'reward_points': 20
            }
        )

        QuizQuestion.objects.get_or_create(
            question="Which of the following items is suitable for home composting?",
            defaults={
                'option_a': "Fruit peels and vegetable scraps",
                'option_b': "Plastic wrappers",
                'option_c': "Batteries and glass",
                'option_d': "Synthetic clothes",
                'correct_option': "A",
                'explanation': "Organic kitchen waste like fruit peels, tea bags, and vegetable scraps decompose rapidly into fertile compost.",
                'reward_points': 20
            }
        )

        # 5. Articles
        Article.objects.get_or_create(
            title="The Science of Source Waste Segregation",
            defaults={
                'category': "Waste Segregation",
                'author': "Dr. Ananya Ray, Environmental Cell",
                'read_time': "4 min read",
                'summary': "Understanding why separating wet organic waste from dry recyclables dramatically reduces methane gas emissions in municipal landfills.",
                'content': "When organic waste is buried in landfills under anaerobic conditions, it produces methane gas—a greenhouse gas 25 times more potent than carbon dioxide. By practicing wet and dry waste segregation at home, organic material is converted into agricultural compost while paper, glass, and aluminum can be endlessly recycled.",
                'image_url': "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80"
            }
        )

        Article.objects.get_or_create(
            title="Mastering Home Composting in Urban Apartments",
            defaults={
                'category': "Composting",
                'author': "Rajesh Mohanty, Eco Volunteer",
                'read_time': "3 min read",
                'summary': "A practical step-by-step guide for apartment residents to build smell-free balcony compost bins using clay pots or terracotta aerobic bins.",
                'content': "Urban composting does not require large yards! By maintaining a 2:1 ratio of dry leaves/coco peat ('browns') to kitchen vegetable scraps ('greens') in an aerated container, aerobic bacteria decompose waste in 30 days without any foul odor.",
                'image_url': "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
            }
        )

        Article.objects.get_or_create(
            title="Clean Rivers, Clean Cities: Restoring Local Waterways",
            defaults={
                'category': "Clean Water",
                'author': "BMC Water Conservation Team",
                'read_time': "5 min read",
                'summary': "How citizen cleanup drives and storm drain trash traps protect Daya and Kuakhai river ecosystems from plastic contamination.",
                'content': "Urban stormwater drains carry tons of macro-plastics straight into river basins during monsoons. Installing municipal drain grates and organizing regular riverbank cleanup drives prevents microplastic pollution and preserves aquatic biodiversity.",
                'image_url': "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80"
            }
        )

        # 6. Sample Certificates
        user = User.objects.first()
        drive = CleanupDrive.objects.first()
        if user and drive:
            Certificate.objects.get_or_create(
                user=user,
                cleanup_drive=drive,
                defaults={
                    'certificate_id': 'CERT-2026-8942',
                    'qr_code_hash': 'safai-verified-8942'
                }
            )

        self.stdout.write(self.style.SUCCESS("Awareness Hub content and sample certificates seeded successfully!"))
