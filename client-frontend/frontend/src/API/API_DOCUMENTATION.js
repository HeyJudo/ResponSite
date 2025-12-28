/**
 * RESPONSITE BACKEND API - DOCUMENTATION GUIDE
 * 
 * This guide explains all available API endpoints and how to use them in the frontend.
 * Base URL: http://localhost:8080/api
 * All requests require credentials: 'include' for session-based authentication
 */

// ==================== AUTHENTICATION ENDPOINTS ====================
/**
 * POST /api/auth/register
 * - Register a new user
 * - Required fields: username, password, email, address, role
 * - Response: User object (without password)
 * - Example usage: registerUser({ username: 'john', password: '123', email: 'john@example.com', address: 'Main St', role: 'RESIDENT' })
 * 
 * POST /api/auth/login
 * - Login with credentials
 * - Required fields: username, password
 * - Response: User object with session cookie
 * - Example usage: loginUser('john', '123')
 * 
 * POST /api/auth/logout
 * - Logout and destroy session
 * - No parameters required
 * - Response: Success message
 * - Example usage: logoutUser()
 * 
 * GET /api/auth/check
 * - Check if user is logged in and get current user data
 * - No parameters required
 * - Response: User object if logged in
 * - Example usage: checkSession()
 */

// ==================== INCIDENTS ENDPOINTS ====================
/**
 * POST /api/incidents
 * - Create a new incident report
 * - Requires: Login
 * - Response: Created incident data
 * - Example usage: createIncident({ type: 'Flood', location: 'Zone 1', description: '...', severity: 'High' })
 * 
 * GET /api/incidents
 * - Get all incidents (STAFF and ADMIN only)
 * - Requires: Login + STAFF/ADMIN role
 * - Response: Array of all incidents
 * - Example usage: getAllIncidents()
 * 
 * GET /api/incidents/my-reports
 * - Get incidents reported by current user
 * - Requires: Login (any role)
 * - Response: Array of user's incidents
 * - Example usage: getMyIncidents()
 * 
 * PUT /api/incidents/{id}/status?status=RESOLVED
 * - Update incident status (STAFF and ADMIN only)
 * - Status values: PENDING, ASSIGNED, IN_PROGRESS, RESOLVED, CANCELLED
 * - Response: Updated incident data
 * - Example usage: updateIncidentStatus(1, 'RESOLVED')
 * 
 * PUT /api/incidents/{id}/cancel
 * - Cancel an incident report (by owner)
 * - Requires: Login (ownership check done server-side)
 * - Response: Cancelled incident data
 * - Example usage: cancelIncident(1)
 * 
 * DELETE /api/incidents/{id}
 * - Delete incident permanently (ADMIN only)
 * - Requires: ADMIN role
 * - Response: Success message
 * - Example usage: deleteIncident(1)
 */

// ==================== RESOURCES ENDPOINTS ====================
/**
 * GET /api/resources
 * - Get all resources in inventory (STAFF and ADMIN only)
 * - Requires: Login + STAFF/ADMIN role
 * - Response: Array of resources with stock levels
 * - Example usage: getAllResources()
 * 
 * POST /api/resources
 * - Add new resource to inventory
 * - Requires: Login + STAFF/ADMIN role
 * - Body: { name, quantity, status, description }
 * - Response: Created resource data
 * - Example usage: addResource({ name: 'Blankets', quantity: 100, status: 'Available', description: 'Emergency supplies' })
 * 
 * PUT /api/resources/{id}
 * - Update resource in inventory
 * - Requires: Login + STAFF/ADMIN role
 * - Body: { name, quantity, status, description }
 * - Response: Updated resource data
 * - Example usage: updateResource(1, { quantity: 150, status: 'Available' })
 * 
 * DELETE /api/resources/{id}
 * - Remove resource from inventory
 * - Requires: Login + STAFF/ADMIN role
 * - Response: Success message
 * - Example usage: deleteResource(1)
 */

// ==================== EVACUATION CENTERS ENDPOINTS ====================
/**
 * GET /api/evacuation-centers
 * - Get all evacuation centers (PUBLIC - no login required)
 * - Response: Array of evacuation centers
 * - Example usage: getAllEvacuationCenters()
 * 
 * POST /api/evacuation-centers
 * - Add new evacuation center (STAFF and ADMIN only)
 * - Requires: Login + STAFF/ADMIN role
 * - Body: { name, location, capacity, status, contactPerson, contactNumber }
 * - Response: Created evacuation center data
 * - Example usage: addEvacuationCenter({ name: 'Community Center A', location: 'Zone 1', capacity: 500, status: 'ACTIVE', ... })
 * 
 * PUT /api/evacuation-centers/{id}/status?status=OPEN
 * - Update evacuation center status
 * - Status values: OPEN, CLOSED, FULL
 * - Response: Updated evacuation center data
 * - Example usage: updateEvacuationCenterStatus(1, 'OPEN')
 * 
 * PUT /api/evacuation-centers/{id}
 * - Update evacuation center details (STAFF and ADMIN only)
 * - Body: { name, location, capacity, status }
 * - Response: Updated evacuation center data
 * - Example usage: updateEvacuationCenter(1, { name: 'Updated Center', location: 'Zone 2', capacity: 300, status: 'OPEN' })
 * 
 * DELETE /api/evacuation-centers/{id}
 * - Delete evacuation center (STAFF and ADMIN only)
 * - Response: Success message
 * - Example usage: deleteEvacuationCenter(1)
 */

// ==================== INFRASTRUCTURE PROJECTS ENDPOINTS ====================
/**
 * GET /api/projects
 * - Get all infrastructure projects (PUBLIC - no login required)
 * - Response: Array of all projects
 * - Example usage: getAllProjects()
 * 
 * GET /api/projects/{id}
 * - Get specific project details (PUBLIC - no login required)
 * - Response: Project object
 * - Example usage: getProjectById(1)
 * 
 * POST /api/projects
 * - Create new infrastructure project (STAFF and ADMIN only)
 * - Body: { name, type, location, description, objectives, startDate, targetEndDate, totalBudget, status, ... }
 * - Response: Created project data
 * - Example usage: createProject({ name: 'Road Construction', type: 'Road', location: 'Zone 1', ... })
 * 
 * PUT /api/projects/{id}
 * - Update infrastructure project (STAFF and ADMIN only)
 * - Body: Update fields like progress, status, etc.
 * - Response: Updated project data
 * - Example usage: updateProject(1, { progress: '50%', status: 'In Progress' })
 */

// ==================== FEEDBACK ENDPOINTS ====================
/**
 * POST /api/feedback/{projectId}
 * - Submit feedback for a project (RESIDENT only)
 * - Body: { rating, comment }
 * - Response: Submitted feedback data
 * - Example usage: submitFeedback(1, { rating: 5, comment: 'Great project!' })
 * 
 * GET /api/feedback/{projectId}
 * - Get all feedbacks for a project (STAFF and ADMIN only)
 * - Response: Array of feedback entries
 * - Example usage: getFeedbacks(1)
 */

// ==================== DASHBOARD ENDPOINTS ====================
/**
 * GET /api/dashboard/stats
 * - Get dashboard statistics for logged-in user
 * - Requires: Login (any role)
 * - Response: Dashboard stats object with user-specific metrics
 * - Example usage: getDashboardStats()
 * - Returns different data based on user role:
 *   - RESIDENT: My incidents, evacuation center status, project feedback
 *   - STAFF: All incidents, resources, evacuation centers, projects
 *   - ADMIN: Full system statistics
 */

// ==================== USAGE EXAMPLES ====================
/**
 * 1. USER AUTHENTICATION FLOW
 * 
 * // Register
 * const newUser = await registerUser({
 *   username: 'john_doe',
 *   password: 'securePassword123',
 *   email: 'john@example.com',
 *   address: '123 Main St',
 *   role: 'RESIDENT'
 * });
 * 
 * // Login
 * const user = await loginUser('john_doe', 'securePassword123');
 * localStorage.setItem('user', JSON.stringify(user));
 * 
 * // Check session on app load
 * try {
 *   const currentUser = await checkSession();
 *   console.log('User is logged in:', currentUser);
 * } catch (error) {
 *   console.log('User is not logged in');
 * }
 * 
 * // Logout
 * await logoutUser();
 * localStorage.removeItem('user');
 */

/**
 * 2. INCIDENT REPORTING (RESIDENT)
 * 
 * // Report an incident
 * const incident = await createIncident({
 *   type: 'Flood',
 *   location: 'Zone 1',
 *   description: 'Heavy flooding at the market',
 *   severity: 'High',
 *   coordinates: { lat: 14.5995, lng: 120.9842 }
 * });
 * 
 * // View my reports
 * const myReports = await getMyIncidents();
 * myReports.forEach(report => console.log(report.status));
 */

/**
 * 3. INCIDENT MANAGEMENT (STAFF/ADMIN)
 * 
 * // Get all incidents
 * const allIncidents = await getAllIncidents();
 * 
 * // Update incident status
 * const updated = await updateIncidentStatus(1, 'IN_PROGRESS');
 * 
 * // Delete incident (ADMIN only)
 * await deleteIncident(1);
 */

/**
 * 4. RESOURCE INVENTORY MANAGEMENT (STAFF/ADMIN)
 * 
 * // View inventory
 * const resources = await getAllResources();
 * const totalBlankets = resources.find(r => r.name === 'Blankets').quantity;
 * 
 * // Add resource
 * const newResource = await addResource({
 *   name: 'Medical Kits',
 *   quantity: 50,
 *   status: 'Available',
 *   description: 'First aid supplies for emergency response'
 * });
 * 
 * // Update stock
 * await updateResource(1, { quantity: 200 });
 */

/**
 * 5. EVACUATION CENTER MANAGEMENT
 * 
 * // View all centers (public)
 * const centers = await getAllEvacuationCenters();
 * 
 * // Add center (STAFF/ADMIN only)
 * const newCenter = await addEvacuationCenter({
 *   name: 'Community Center',
 *   location: 'Zone 1',
 *   capacity: 500,
 *   status: 'ACTIVE',
 *   contactPerson: 'John Manager',
 *   contactNumber: '09123456789'
 * });
 * 
 * // Update status
 * await updateEvacuationCenterStatus(1, 'FULL');
 */

/**
 * 6. PROJECT VIEWING (PUBLIC)
 * 
 * // View all projects (anyone can access)
 * const projects = await getAllProjects();
 * 
 * // View project details
 * const project = await getProjectById(1);
 * console.log(project.progress, project.status);
 * 
 * // Submit feedback (RESIDENT only)
 * await submitFeedback(1, {
 *   rating: 5,
 *   comment: 'Great infrastructure development!'
 * });
 */

/**
 * 7. PROJECT MANAGEMENT (STAFF/ADMIN)
 * 
 * // Create project
 * const newProject = await createProject({
 *   name: 'Road Rehabilitation',
 *   type: 'Road',
 *   location: 'Zone 2',
 *   description: 'Rehabilitation of main road',
 *   startDate: '2025-01-15',
 *   targetEndDate: '2025-06-30',
 *   totalBudget: '5000000',
 *   status: 'Planned'
 * });
 * 
 * // Update project
 * await updateProject(1, {
 *   progress: '75%',
 *   status: 'In Progress'
 * });
 * 
 * // View feedbacks
 * const feedbacks = await getFeedbacks(1);
 * const avgRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;
 */

export {};
