#!/usr/bin/env python3
"""
Backend API Test Suite for QuzeeDrive
Tests all endpoints against the production backend URL
"""

import requests
import sys
from typing import Dict, Any, Optional

# Backend URL from frontend/.env
BASE_URL = "https://car-booking-hub-30.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_test(name: str, passed: bool, details: str = ""):
    status = f"{Colors.GREEN}✓ PASS{Colors.RESET}" if passed else f"{Colors.RED}✗ FAIL{Colors.RESET}"
    print(f"{status} - {name}")
    if details:
        print(f"  {details}")
    if not passed:
        print()

def test_root_endpoint():
    """Test 1: GET /api/ returns JSON message"""
    print(f"\n{Colors.BLUE}Test 1: GET /api/ - Root endpoint{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        if response.status_code != 200:
            print_test("Root endpoint status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        data = response.json()
        if not isinstance(data, dict) or "message" not in data:
            print_test("Root endpoint response format", False, f"Expected dict with 'message' key, got {data}")
            return False
        
        print_test("Root endpoint", True, f"Response: {data}")
        return True
    except Exception as e:
        print_test("Root endpoint", False, f"Error: {str(e)}")
        return False

def test_list_cars():
    """Test 2: GET /api/cars returns non-empty list with seeded cars"""
    print(f"\n{Colors.BLUE}Test 2: GET /api/cars - List all cars{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/cars", timeout=10)
        
        if response.status_code != 200:
            print_test("List cars status code", False, f"Expected 200, got {response.status_code}")
            return None
        
        cars = response.json()
        
        if not isinstance(cars, list):
            print_test("List cars response type", False, f"Expected list, got {type(cars)}")
            return None
        
        if len(cars) == 0:
            print_test("List cars non-empty", False, "Expected non-empty list, got empty list")
            return None
        
        print_test("List cars non-empty", True, f"Found {len(cars)} cars")
        
        # Verify car structure
        required_fields = ["id", "name", "category", "transmission", "fuel", "seats", "pricePerDay", "image", "tag"]
        sample_car = cars[0]
        missing_fields = [f for f in required_fields if f not in sample_car]
        
        if missing_fields:
            print_test("Car structure", False, f"Missing fields: {missing_fields}")
            return None
        
        print_test("Car structure", True, f"All required fields present")
        
        # Verify categories
        categories = set(car["category"] for car in cars)
        expected_categories = {"Hatchback", "Sedan", "SUV", "Luxury", "MUV"}
        
        if not expected_categories.issubset(categories):
            missing = expected_categories - categories
            print_test("All categories present", False, f"Missing categories: {missing}")
            return None
        
        print_test("All categories present", True, f"Categories: {categories}")
        
        return cars
    except Exception as e:
        print_test("List cars", False, f"Error: {str(e)}")
        return None

def test_filter_cars_by_category(cars: list):
    """Test 3: GET /api/cars?category=SUV returns only SUV cars"""
    print(f"\n{Colors.BLUE}Test 3: GET /api/cars?category=SUV - Filter by category{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/cars?category=SUV", timeout=10)
        
        if response.status_code != 200:
            print_test("Filter cars status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        filtered_cars = response.json()
        
        if not isinstance(filtered_cars, list):
            print_test("Filter cars response type", False, f"Expected list, got {type(filtered_cars)}")
            return False
        
        if len(filtered_cars) == 0:
            print_test("Filter cars non-empty", False, "Expected SUV cars, got empty list")
            return False
        
        # Verify all cars are SUVs
        non_suv = [car for car in filtered_cars if car.get("category") != "SUV"]
        if non_suv:
            print_test("Filter cars category", False, f"Found {len(non_suv)} non-SUV cars in filtered results")
            return False
        
        print_test("Filter by category", True, f"Found {len(filtered_cars)} SUV cars")
        return True
    except Exception as e:
        print_test("Filter cars", False, f"Error: {str(e)}")
        return False

def test_get_single_car(car_id: str):
    """Test 4a: GET /api/cars/{id} returns the same car"""
    print(f"\n{Colors.BLUE}Test 4a: GET /api/cars/{car_id} - Get single car{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/cars/{car_id}", timeout=10)
        
        if response.status_code != 200:
            print_test("Get single car status code", False, f"Expected 200, got {response.status_code}")
            return None
        
        car = response.json()
        
        if car.get("id") != car_id:
            print_test("Get single car ID match", False, f"Expected ID {car_id}, got {car.get('id')}")
            return None
        
        print_test("Get single car", True, f"Retrieved car: {car.get('name')}")
        return car
    except Exception as e:
        print_test("Get single car", False, f"Error: {str(e)}")
        return None

def test_get_nonexistent_car():
    """Test 4b: GET /api/cars/{unknown_id} returns 404"""
    print(f"\n{Colors.BLUE}Test 4b: GET /api/cars/unknown-id - Get nonexistent car{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/cars/unknown-car-id-12345", timeout=10)
        
        if response.status_code != 404:
            print_test("Get nonexistent car status code", False, f"Expected 404, got {response.status_code}")
            return False
        
        print_test("Get nonexistent car returns 404", True)
        return True
    except Exception as e:
        print_test("Get nonexistent car", False, f"Error: {str(e)}")
        return False

def test_create_booking(car_id: str, car_name: str):
    """Test 5: POST /api/bookings creates booking with booking_code"""
    print(f"\n{Colors.BLUE}Test 5: POST /api/bookings - Create booking{Colors.RESET}")
    try:
        payload = {
            "name": "Rajesh Kumar",
            "phone": "9876543210",
            "start_date": "2026-02-01",
            "end_date": "2026-02-05",
            "car_id": car_id,
            "car_name": car_name
        }
        
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        
        if response.status_code not in [200, 201]:
            print_test("Create booking status code", False, f"Expected 200/201, got {response.status_code}")
            return None
        
        booking = response.json()
        
        if "booking_code" not in booking:
            print_test("Create booking response", False, "Missing booking_code in response")
            return None
        
        booking_code = booking["booking_code"]
        
        # Verify booking_code format (QZ-YYYY-DDDD where DDDD is exactly 4 digits)
        if not booking_code.startswith("QZ-"):
            print_test("Booking code format", False, f"Expected format QZ-YYYY-DDDD, got {booking_code}")
            return None
        
        parts = booking_code.split("-")
        if len(parts) != 3:
            print_test("Booking code format", False, f"Expected format QZ-YYYY-DDDD, got {booking_code}")
            return None
        
        # Verify last part is exactly 4 digits
        if len(parts[2]) != 4 or not parts[2].isdigit():
            print_test("Booking code format", False, f"Expected DDDD to be exactly 4 digits (0-9), got {parts[2]}")
            return None
        
        print_test("Create booking", True, f"Booking code: {booking_code}")
        return booking_code
    except Exception as e:
        print_test("Create booking", False, f"Error: {str(e)}")
        return None

def test_create_booking_missing_name():
    """Test 5b: POST /api/bookings without name returns 400/422"""
    print(f"\n{Colors.BLUE}Test 5b: POST /api/bookings - Missing name validation{Colors.RESET}")
    try:
        payload = {
            "phone": "9876543210",
            "start_date": "2026-02-01",
            "end_date": "2026-02-05",
            "car_id": "some-car-id"
        }
        
        response = requests.post(f"{BASE_URL}/bookings", json=payload, timeout=10)
        
        if response.status_code not in [400, 422]:
            print_test("Create booking validation", False, f"Expected 400/422, got {response.status_code}")
            return False
        
        print_test("Create booking validation", True, f"Correctly rejected with {response.status_code}")
        return True
    except Exception as e:
        print_test("Create booking validation", False, f"Error: {str(e)}")
        return False

def test_track_booking(booking_code: str):
    """Test 6: GET /api/bookings/track/{booking_code} returns tracking info"""
    print(f"\n{Colors.BLUE}Test 6: GET /api/bookings/track/{booking_code} - Track booking{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/bookings/track/{booking_code}", timeout=10)
        
        if response.status_code != 200:
            print_test("Track booking status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        tracking = response.json()
        
        required_fields = ["booking_code", "status", "steps", "car_name", "name"]
        missing_fields = [f for f in required_fields if f not in tracking]
        
        if missing_fields:
            print_test("Track booking response", False, f"Missing fields: {missing_fields}")
            return False
        
        if not isinstance(tracking["steps"], list) or len(tracking["steps"]) != 4:
            print_test("Track booking steps", False, f"Expected 4 steps, got {len(tracking.get('steps', []))}")
            return False
        
        print_test("Track booking", True, f"Status: {tracking['status']}, Steps: {len(tracking['steps'])}")
        return True
    except Exception as e:
        print_test("Track booking", False, f"Error: {str(e)}")
        return False

def test_track_booking_case_insensitive(booking_code: str):
    """Test 6b: GET /api/bookings/track/{lowercase_code} works (case-insensitive)"""
    print(f"\n{Colors.BLUE}Test 6b: Track booking case-insensitive{Colors.RESET}")
    try:
        lowercase_code = booking_code.lower()
        response = requests.get(f"{BASE_URL}/bookings/track/{lowercase_code}", timeout=10)
        
        if response.status_code != 200:
            print_test("Track booking case-insensitive", False, f"Expected 200, got {response.status_code}")
            return False
        
        tracking = response.json()
        
        if tracking.get("booking_code") != booking_code:
            print_test("Track booking case-insensitive code", False, f"Expected {booking_code}, got {tracking.get('booking_code')}")
            return False
        
        print_test("Track booking case-insensitive", True, f"Lowercase code worked")
        return True
    except Exception as e:
        print_test("Track booking case-insensitive", False, f"Error: {str(e)}")
        return False

def test_track_nonexistent_booking():
    """Test 6c: GET /api/bookings/track/{invalid_code} returns 404"""
    print(f"\n{Colors.BLUE}Test 6c: Track nonexistent booking{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/bookings/track/QZ-9999-0000", timeout=10)
        
        if response.status_code != 404:
            print_test("Track nonexistent booking", False, f"Expected 404, got {response.status_code}")
            return False
        
        print_test("Track nonexistent booking returns 404", True)
        return True
    except Exception as e:
        print_test("Track nonexistent booking", False, f"Error: {str(e)}")
        return False

def test_list_bookings():
    """Test 7: GET /api/bookings returns list containing new booking"""
    print(f"\n{Colors.BLUE}Test 7: GET /api/bookings - List all bookings{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/bookings", timeout=10)
        
        if response.status_code != 200:
            print_test("List bookings status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        bookings = response.json()
        
        if not isinstance(bookings, list):
            print_test("List bookings response type", False, f"Expected list, got {type(bookings)}")
            return False
        
        if len(bookings) == 0:
            print_test("List bookings non-empty", False, "Expected at least one booking")
            return False
        
        print_test("List bookings", True, f"Found {len(bookings)} booking(s)")
        return True
    except Exception as e:
        print_test("List bookings", False, f"Error: {str(e)}")
        return False

def test_create_host():
    """Test 8: POST /api/hosts creates host application"""
    print(f"\n{Colors.BLUE}Test 8: POST /api/hosts - Create host application{Colors.RESET}")
    try:
        payload = {
            "name": "Priya Sharma",
            "phone": "9123456789",
            "city": "Mumbai",
            "car_model": "Honda City"
        }
        
        response = requests.post(f"{BASE_URL}/hosts", json=payload, timeout=10)
        
        if response.status_code not in [200, 201]:
            print_test("Create host status code", False, f"Expected 200/201, got {response.status_code}")
            return False
        
        host = response.json()
        
        if "id" not in host:
            print_test("Create host response", False, "Missing id in response")
            return False
        
        print_test("Create host", True, f"Host ID: {host['id']}")
        return True
    except Exception as e:
        print_test("Create host", False, f"Error: {str(e)}")
        return False

def test_create_host_missing_phone():
    """Test 8b: POST /api/hosts without phone returns error"""
    print(f"\n{Colors.BLUE}Test 8b: POST /api/hosts - Missing phone validation{Colors.RESET}")
    try:
        payload = {
            "name": "Test User",
            "city": "Chennai"
        }
        
        response = requests.post(f"{BASE_URL}/hosts", json=payload, timeout=10)
        
        if response.status_code not in [400, 422]:
            print_test("Create host validation", False, f"Expected 400/422, got {response.status_code}")
            return False
        
        print_test("Create host validation", True, f"Correctly rejected with {response.status_code}")
        return True
    except Exception as e:
        print_test("Create host validation", False, f"Error: {str(e)}")
        return False

def test_list_hosts():
    """Test 9: GET /api/hosts returns list containing new host"""
    print(f"\n{Colors.BLUE}Test 9: GET /api/hosts - List all hosts{Colors.RESET}")
    try:
        response = requests.get(f"{BASE_URL}/hosts", timeout=10)
        
        if response.status_code != 200:
            print_test("List hosts status code", False, f"Expected 200, got {response.status_code}")
            return False
        
        hosts = response.json()
        
        if not isinstance(hosts, list):
            print_test("List hosts response type", False, f"Expected list, got {type(hosts)}")
            return False
        
        if len(hosts) == 0:
            print_test("List hosts non-empty", False, "Expected at least one host")
            return False
        
        print_test("List hosts", True, f"Found {len(hosts)} host(s)")
        return True
    except Exception as e:
        print_test("List hosts", False, f"Error: {str(e)}")
        return False

def main():
    print(f"\n{Colors.YELLOW}{'='*60}{Colors.RESET}")
    print(f"{Colors.YELLOW}QuzeeDrive Backend API Test Suite{Colors.RESET}")
    print(f"{Colors.YELLOW}Backend URL: {BASE_URL}{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*60}{Colors.RESET}")
    
    results = {
        "passed": 0,
        "failed": 0,
        "total": 0
    }
    
    # Test 1: Root endpoint
    if test_root_endpoint():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 2: List cars
    cars = test_list_cars()
    if cars:
        results["passed"] += 3  # non-empty, structure, categories
    else:
        results["failed"] += 3
    results["total"] += 3
    
    # Test 3: Filter cars
    if cars and test_filter_cars_by_category(cars):
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 4: Get single car
    car_id = None
    car_name = None
    if cars:
        car_id = cars[0]["id"]
        car_name = cars[0]["name"]
        car = test_get_single_car(car_id)
        if car:
            results["passed"] += 1
        else:
            results["failed"] += 1
        results["total"] += 1
    
    # Test 4b: Get nonexistent car
    if test_get_nonexistent_car():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 5: Create booking
    booking_code = None
    if car_id:
        booking_code = test_create_booking(car_id, car_name)
        if booking_code:
            results["passed"] += 1
        else:
            results["failed"] += 1
        results["total"] += 1
    
    # Test 5b: Create booking validation
    if test_create_booking_missing_name():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 6: Track booking
    if booking_code:
        if test_track_booking(booking_code):
            results["passed"] += 1
        else:
            results["failed"] += 1
        results["total"] += 1
        
        # Test 6b: Case-insensitive tracking
        if test_track_booking_case_insensitive(booking_code):
            results["passed"] += 1
        else:
            results["failed"] += 1
        results["total"] += 1
    
    # Test 6c: Track nonexistent booking
    if test_track_nonexistent_booking():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 7: List bookings
    if test_list_bookings():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 8: Create host
    if test_create_host():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 8b: Create host validation
    if test_create_host_missing_phone():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Test 9: List hosts
    if test_list_hosts():
        results["passed"] += 1
    else:
        results["failed"] += 1
    results["total"] += 1
    
    # Summary
    print(f"\n{Colors.YELLOW}{'='*60}{Colors.RESET}")
    print(f"{Colors.YELLOW}Test Summary{Colors.RESET}")
    print(f"{Colors.YELLOW}{'='*60}{Colors.RESET}")
    print(f"Total Tests: {results['total']}")
    print(f"{Colors.GREEN}Passed: {results['passed']}{Colors.RESET}")
    print(f"{Colors.RED}Failed: {results['failed']}{Colors.RESET}")
    
    if results['failed'] == 0:
        print(f"\n{Colors.GREEN}✓ All tests passed!{Colors.RESET}\n")
        return 0
    else:
        print(f"\n{Colors.RED}✗ Some tests failed{Colors.RESET}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
