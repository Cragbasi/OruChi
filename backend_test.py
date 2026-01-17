import requests
import sys
import json
from datetime import datetime

class ChiFixerupperAPITester:
    def __init__(self, base_url="https://repairmaster-4.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_seed_data(self):
        """Test seeding sample data"""
        return self.run_test("Seed Data", "POST", "seed", 200)

    def test_get_testimonials(self):
        """Test fetching testimonials"""
        return self.run_test("Get Testimonials", "GET", "testimonials", 200)

    def test_get_gallery(self):
        """Test fetching gallery items"""
        return self.run_test("Get Gallery", "GET", "gallery", 200)

    def test_create_contact_message(self):
        """Test creating a contact message"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "(555) 123-4567",
            "message": "This is a test message for Chi's Fixerupper services."
        }
        return self.run_test("Create Contact Message", "POST", "contact", 200, contact_data)

    def test_get_contact_messages(self):
        """Test fetching contact messages"""
        return self.run_test("Get Contact Messages", "GET", "contact", 200)

    def test_create_testimonial(self):
        """Test creating a testimonial"""
        testimonial_data = {
            "name": "Test Customer",
            "rating": 5,
            "comment": "Excellent service from Chi! Highly recommended.",
            "service_type": "Plumbing"
        }
        return self.run_test("Create Testimonial", "POST", "testimonials", 200, testimonial_data)

    def test_create_gallery_item(self):
        """Test creating a gallery item"""
        gallery_data = {
            "title": "Test Kitchen Renovation",
            "description": "Complete kitchen cabinet refinishing",
            "service_type": "Cabinets",
            "before_image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            "after_image": "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800"
        }
        return self.run_test("Create Gallery Item", "POST", "gallery", 200, gallery_data)

    def test_invalid_contact_data(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "phone": "",  # Empty phone
            "message": ""  # Empty message
        }
        success, _ = self.run_test("Invalid Contact Data", "POST", "contact", 422, invalid_data)
        return success  # 422 is expected for validation errors

def main():
    print("🚀 Starting Chi's Fixerupper API Tests")
    print("=" * 50)
    
    # Setup
    tester = ChiFixerupperAPITester()

    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic connectivity
    tester.test_root_endpoint()
    
    # Seed data first
    tester.test_seed_data()
    
    # Test GET endpoints
    tester.test_get_testimonials()
    tester.test_get_gallery()
    
    # Test POST endpoints
    tester.test_create_contact_message()
    tester.test_create_testimonial()
    tester.test_create_gallery_item()
    
    # Test data retrieval after creation
    tester.test_get_contact_messages()
    
    # Test validation
    tester.test_invalid_contact_data()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())