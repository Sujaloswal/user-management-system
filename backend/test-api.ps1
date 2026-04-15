# API Testing Script for User Management System
# Run this in PowerShell after starting the dev server

$baseUrl = "http://localhost:5000"
$adminToken = ""
$managerToken = ""
$userToken = ""
$createdUserId = ""

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  USER MANAGEMENT API TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host ""
Write-Host "[TEST 1] Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get
    Write-Host "[PASSED] $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
    exit
}

# Test 2: Admin Login
Write-Host ""
Write-Host "[TEST 2] Admin Login..." -ForegroundColor Yellow
try {
    $body = @{
        email = "admin@example.com"
        password = "Admin@123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    $adminToken = $response.accessToken
    Write-Host "[PASSED] Admin logged in successfully" -ForegroundColor Green
    Write-Host "  User: $($response.user.name) ($($response.user.role))" -ForegroundColor Gray
    Write-Host "  Token: $($adminToken.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
    exit
}

# Test 3: Manager Login
Write-Host ""
Write-Host "[TEST 3] Manager Login..." -ForegroundColor Yellow
try {
    $body = @{
        email = "manager@example.com"
        password = "Manager@123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    $managerToken = $response.accessToken
    Write-Host "[PASSED] Manager logged in successfully" -ForegroundColor Green
    Write-Host "  User: $($response.user.name) ($($response.user.role))" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 4: User Login
Write-Host ""
Write-Host "[TEST 4] User Login..." -ForegroundColor Yellow
try {
    $body = @{
        email = "user@example.com"
        password = "User@123"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json"
    $userToken = $response.accessToken
    Write-Host "[PASSED] User logged in successfully" -ForegroundColor Green
    Write-Host "  User: $($response.user.name) ($($response.user.role))" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 5: Get Current User
Write-Host ""
Write-Host "[TEST 5] Get Current User (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers $headers
    Write-Host "[PASSED] Retrieved current user" -ForegroundColor Green
    Write-Host "  User: $($response.user.name) - $($response.user.email)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 6: Get All Users (Admin)
Write-Host ""
Write-Host "[TEST 6] Get All Users (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Get -Headers $headers
    Write-Host "[PASSED] Retrieved $($response.users.Count) users" -ForegroundColor Green
    Write-Host "  Total users: $($response.totalUsers)" -ForegroundColor Gray
    Write-Host "  Page: $($response.currentPage)/$($response.totalPages)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 7: Create New User (Admin)
Write-Host ""
Write-Host "[TEST 7] Create New User (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $body = @{
        name = "Test User"
        email = "testuser@example.com"
        password = "Test@123"
        role = "user"
        status = "active"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    $createdUserId = $response.user._id
    Write-Host "[PASSED] User created successfully" -ForegroundColor Green
    Write-Host "  User ID: $createdUserId" -ForegroundColor Gray
    Write-Host "  Name: $($response.user.name)" -ForegroundColor Gray
    Write-Host "  Email: $($response.user.email)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 8: Get User by ID
Write-Host ""
Write-Host "[TEST 8] Get User by ID (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$createdUserId" -Method Get -Headers $headers
    Write-Host "[PASSED] Retrieved user by ID" -ForegroundColor Green
    Write-Host "  User: $($response.user.name) - $($response.user.email)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 9: Update User (Admin)
Write-Host ""
Write-Host "[TEST 9] Update User (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $body = @{
        name = "Updated Test User"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$createdUserId" -Method Put -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "[PASSED] User updated successfully" -ForegroundColor Green
    Write-Host "  Updated name: $($response.user.name)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 10: Manager Access
Write-Host ""
Write-Host "[TEST 10] Manager Access (Get All Users)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $managerToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Get -Headers $headers
    Write-Host "[PASSED] Manager can access user list" -ForegroundColor Green
    Write-Host "  Retrieved $($response.users.Count) users" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 11: User Access Control (Should Fail)
Write-Host ""
Write-Host "[TEST 11] User Access Control (Should Fail)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $userToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method Get -Headers $headers
    Write-Host "[FAILED] User should NOT have access" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "[PASSED] Access correctly denied for regular user" -ForegroundColor Green
        Write-Host "  Message: Access denied (403 Forbidden)" -ForegroundColor Gray
    } else {
        Write-Host "[FAILED] Unexpected error" -ForegroundColor Red
    }
}

# Test 12: Search Users
Write-Host ""
Write-Host "[TEST 12] Search Users (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users?search=admin" -Method Get -Headers $headers
    Write-Host "[PASSED] Search users successful" -ForegroundColor Green
    Write-Host "  Found $($response.users.Count) users matching 'admin'" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 13: Filter by Role
Write-Host ""
Write-Host "[TEST 13] Filter Users by Role (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users?role=user" -Method Get -Headers $headers
    Write-Host "[PASSED] Filter by role successful" -ForegroundColor Green
    Write-Host "  Found $($response.users.Count) users with role 'user'" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 14: Delete User (Soft Delete)
Write-Host ""
Write-Host "[TEST 14] Delete User - Soft Delete (Admin)..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$createdUserId" -Method Delete -Headers $headers
    Write-Host "[PASSED] User deactivated successfully" -ForegroundColor Green
    Write-Host "  Message: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Test 15: Verify User is Inactive
Write-Host ""
Write-Host "[TEST 15] Verify User is Inactive..." -ForegroundColor Yellow
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $response = Invoke-RestMethod -Uri "$baseUrl/api/users/$createdUserId" -Method Get -Headers $headers
    if ($response.user.status -eq "inactive") {
        Write-Host "[PASSED] User status correctly set to inactive" -ForegroundColor Green
        Write-Host "  Status: $($response.user.status)" -ForegroundColor Gray
    } else {
        Write-Host "[FAILED] User status should be inactive" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAILED] $_" -ForegroundColor Red
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "All critical tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "If all tests passed, your backend is working perfectly!" -ForegroundColor Green
Write-Host "You can now proceed to build the frontend." -ForegroundColor Green
Write-Host ""
