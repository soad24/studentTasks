// نظام أثر - سجل الممارسات المهنية
// Professional Practices Management System

// Mock data for demonstration
const mockData = {
    users: [
        {
            id: 1,
            name: 'أحمد محمد الشريف',
            email: 'student@athar.om',
            password: 'password123',
            student_id: '2021001234',
            role: 'student',
            branch: 'مسقط',
            college: 'الهندسة والتكنولوجيا',
            department: 'هندسة الحاسوب',
            phone: '96890123456'
        },
        {
            id: 2,
            name: 'فاطمة علي المقبالي',
            email: 'reviewer@athar.om',
            password: 'password123',
            role: 'reviewer',
            branch: 'مسقط'
        },
        {
            id: 3,
            name: 'سالم بن عبدالله الهنائي',
            email: 'approver@athar.om',
            password: 'password123',
            role: 'approver',
            branch: 'مسقط'
        },
        {
            id: 4,
            name: 'عائشة بنت سعيد البلوشي',
            email: 'certifier@athar.om',
            password: 'password123',
            role: 'certifier',
            branch: 'مسقط'
        },
        {
            id: 5,
            name: 'مدير النظام',
            email: 'admin@athar.om',
            password: 'password123',
            role: 'admin'
        }
    ],
    practiceTypes: [
        { id: 1, name_ar: 'التدريب على رأس العمل', name_en: 'On-the-job Training', base_points: 20 },
        { id: 2, name_ar: 'التدريب الاختياري', name_en: 'Optional Training', base_points: 15 },
        { id: 3, name_ar: 'الزيارات الميدانية', name_en: 'Field Visits', base_points: 5 },
        { id: 4, name_ar: 'ورش العمل والندوات', name_en: 'Workshops and Seminars', base_points: 10 },
        { id: 5, name_ar: 'المؤتمرات المهنية', name_en: 'Professional Conferences', base_points: 15 },
        { id: 6, name_ar: 'المسابقات والهاكاثونات', name_en: 'Competitions and Hackathons', base_points: 25 },
        { id: 7, name_ar: 'المعارض', name_en: 'Exhibitions', base_points: 10 },
        { id: 8, name_ar: 'عضوية الجمعيات المهنية', name_en: 'Professional Society Membership', base_points: 15 },
        { id: 9, name_ar: 'الشهادات الاحترافية', name_en: 'Professional Certifications', base_points: 30 },
        { id: 10, name_ar: 'العمل بدوام جزئي', name_en: 'Part-time Work', base_points: 20 }
    ],
    participationTypes: [
        { id: 1, name_ar: 'حضور', name_en: 'Attendance', multiplier: 1 },
        { id: 2, name_ar: 'مشاركة', name_en: 'Participation', multiplier: 2 },
        { id: 3, name_ar: 'تقديم', name_en: 'Presentation', multiplier: 3 },
        { id: 4, name_ar: 'تنظيم', name_en: 'Organization', multiplier: 4 },
        { id: 5, name_ar: 'قيادة', name_en: 'Leadership', multiplier: 5 }
    ],
    participationLevels: [
        { id: 1, name_ar: 'الفرع', name_en: 'Branch Level', multiplier: 1 },
        { id: 2, name_ar: 'الجامعة', name_en: 'University Level', multiplier: 2 },
        { id: 3, name_ar: 'محلي', name_en: 'Local Level', multiplier: 3 },
        { id: 4, name_ar: 'إقليمي', name_en: 'Regional Level', multiplier: 4 },
        { id: 5, name_ar: 'دولي', name_en: 'International Level', multiplier: 5 }
    ],
    practices: [
        {
            id: 1,
            user_id: 1,
            practice_type_id: 1,
            participation_type_id: 2,
            participation_level_id: 3,
            title: 'تدريب في شركة عمان للاتصالات',
            description: 'تدريب صيفي في قسم تطوير البرمجيات',
            organization: 'شركة عمان للاتصالات',
            start_date: '2024-06-01',
            end_date: '2024-08-31',
            duration_hours: 480,
            status: 'approved',
            calculated_points: 120,
            created_at: '2024-09-01'
        },
        {
            id: 2,
            user_id: 1,
            practice_type_id: 4,
            participation_type_id: 3,
            participation_level_id: 4,
            title: 'ورشة عمل في الذكاء الاصطناعي',
            description: 'ورشة عمل متقدمة في تطبيقات الذكاء الاصطناعي',
            organization: 'جامعة السلطان قابوس',
            start_date: '2024-10-15',
            end_date: '2024-10-17',
            duration_hours: 24,
            status: 'pending',
            calculated_points: 120,
            created_at: '2024-10-18'
        }
    ]
};

// Application state
let currentUser = null;
let currentPage = 'landing';

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA');
}

function getStatusBadgeClass(status) {
    const classes = {
        'pending': 'badge-warning',
        'under_review': 'badge-info',
        'approved': 'badge-success',
        'rejected': 'badge-danger',
        'certified': 'badge-primary'
    };
    return classes[status] || 'badge-secondary';
}

function getStatusText(status) {
    const texts = {
        'pending': 'في الانتظار',
        'under_review': 'قيد المراجعة',
        'approved': 'معتمد',
        'rejected': 'مرفوض',
        'certified': 'مصدق'
    };
    return texts[status] || 'غير محدد';
}

// Authentication functions
function login(email, password) {
    const user = mockData.users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMainApp();
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLandingPage();
}

function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
}

// Page navigation functions
function showLandingPage() {
    document.getElementById('landingPage').classList.remove('d-none');
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('mainApp').classList.add('d-none');
    currentPage = 'landing';
}

function showLoginPage() {
    document.getElementById('landingPage').classList.add('d-none');
    document.getElementById('loginPage').classList.remove('d-none');
    document.getElementById('mainApp').classList.add('d-none');
    currentPage = 'login';
}

function showMainApp() {
    document.getElementById('landingPage').classList.add('d-none');
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('mainApp').classList.remove('d-none');
    currentPage = 'main';
    
    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    
    // Setup navigation based on user role
    setupNavigation();
    
    // Load dashboard
    loadDashboard();
}

function setupNavigation() {
    const sidebarNav = document.getElementById('sidebarNav');
    const practicesNavItem = document.getElementById('practicesNavItem');
    const addPracticeNavItem = document.getElementById('addPracticeNavItem');
    const settingsNavItem = document.getElementById('settingsNavItem');
    const practicesNavText = document.getElementById('practicesNavText');
    
    // Clear sidebar
    sidebarNav.innerHTML = '';
    
    if (currentUser.role === 'student') {
        practicesNavText.textContent = 'ممارساتي المهنية';
        practicesNavItem.style.display = 'block';
        addPracticeNavItem.style.display = 'block';
        
        sidebarNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" href="#" data-page="dashboard">
                    <i class="fas fa-tachometer-alt me-2"></i>
                    لوحة التحكم
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-page="practices">
                    <i class="fas fa-list me-2"></i>
                    ممارساتي المهنية
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-page="add-practice">
                    <i class="fas fa-plus me-2"></i>
                    إضافة ممارسة جديدة
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-page="reports">
                    <i class="fas fa-chart-bar me-2"></i>
                    تقاريري
                </a>
            </li>
        `;
    } else {
        practicesNavText.textContent = 'الممارسات المهنية';
        practicesNavItem.style.display = 'block';
        addPracticeNavItem.style.display = 'none';
        settingsNavItem.style.display = 'block';
        
        sidebarNav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link active" href="#" data-page="dashboard">
                    <i class="fas fa-tachometer-alt me-2"></i>
                    لوحة التحكم
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-page="practices">
                    <i class="fas fa-list me-2"></i>
                    الممارسات المهنية
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-page="reports">
                    <i class="fas fa-chart-bar me-2"></i>
                    التقارير
                </a>
            </li>
        `;
    }
}

function loadDashboard() {
    const pageContent = document.getElementById('pageContent');
    
    if (currentUser.role === 'student') {
        loadStudentDashboard();
    } else if (currentUser.role === 'reviewer') {
        loadReviewerDashboard();
    } else if (currentUser.role === 'approver') {
        loadApproverDashboard();
    } else if (currentUser.role === 'certifier') {
        loadCertifierDashboard();
    } else if (currentUser.role === 'admin') {
        loadAdminDashboard();
    }
}

function loadStudentDashboard() {
    const userPractices = mockData.practices.filter(p => p.user_id === currentUser.id);
    const totalPoints = userPractices.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.calculated_points, 0);
    const pendingCount = userPractices.filter(p => p.status === 'pending').length;
    const approvedCount = userPractices.filter(p => p.status === 'approved').length;
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                <span class="badge bg-primary fs-6">${currentUser.student_id}</span>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">إجمالي النقاط</div>
                                    <div class="text-white h4">${totalPoints}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-star fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-success h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">معتمدة</div>
                                    <div class="text-white h4">${approvedCount}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-warning h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">في الانتظار</div>
                                    <div class="text-white h4">${pendingCount}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-clock fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-info h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">إجمالي الممارسات</div>
                                    <div class="text-white h4">${userPractices.length}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-list fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="row mb-4">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">الإجراءات السريعة</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <button class="btn btn-success w-100" onclick="loadPage('add-practice')">
                                        <i class="fas fa-plus me-2"></i>
                                        إضافة ممارسة جديدة
                                    </button>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <button class="btn btn-primary w-100" onclick="loadPage('practices')">
                                        <i class="fas fa-list me-2"></i>
                                        عرض جميع الممارسات
                                    </button>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <button class="btn btn-info w-100" onclick="downloadRecord()">
                                        <i class="fas fa-download me-2"></i>
                                        تحميل السجل
                                    </button>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <button class="btn btn-warning w-100" onclick="loadPage('reports')">
                                        <i class="fas fa-chart-bar me-2"></i>
                                        التقارير
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Practices -->
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">أحدث الممارسات المهنية</h5>
                    <button class="btn btn-sm btn-outline-primary" onclick="loadPage('practices')">عرض الكل</button>
                </div>
                <div class="card-body">
                    ${userPractices.length > 0 ? generatePracticesTable(userPractices.slice(0, 5)) : generateEmptyState()}
                </div>
            </div>
        </div>
    `;
}

function loadReviewerDashboard() {
    const pendingReviews = mockData.practices.filter(p => p.status === 'pending');
    const reviewedCount = mockData.practices.filter(p => p.status !== 'pending').length;
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                <span class="badge bg-info fs-6">مراجع</span>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-warning h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">في انتظار المراجعة</div>
                                    <div class="text-white h4">${pendingReviews.length}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-clock fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-success h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">تم مراجعتها</div>
                                    <div class="text-white h4">${reviewedCount}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Reviews -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">الممارسات في انتظار المراجعة</h5>
                </div>
                <div class="card-body">
                    ${pendingReviews.length > 0 ? generateReviewTable(pendingReviews) : generateEmptyReviewState()}
                </div>
            </div>
        </div>
    `;
}

function loadApproverDashboard() {
    const pendingApprovals = mockData.practices.filter(p => p.status === 'under_review');
    const approvedCount = mockData.practices.filter(p => p.status === 'approved').length;
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                <span class="badge bg-success fs-6">معتمد</span>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-info h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">في انتظار الاعتماد</div>
                                    <div class="text-white h4">${pendingApprovals.length}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-stamp fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-success h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">تم اعتمادها</div>
                                    <div class="text-white h4">${approvedCount}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Approvals -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">الممارسات في انتظار الاعتماد</h5>
                </div>
                <div class="card-body">
                    ${pendingApprovals.length > 0 ? generateApprovalTable(pendingApprovals) : generateEmptyApprovalState()}
                </div>
            </div>
        </div>
    `;
}

function loadCertifierDashboard() {
    const pendingCertifications = mockData.practices.filter(p => p.status === 'approved');
    const certifiedCount = mockData.practices.filter(p => p.status === 'certified').length;
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                <span class="badge bg-primary fs-6">مصدق</span>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-warning h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">في انتظار التصديق</div>
                                    <div class="text-white h4">${pendingCertifications.length}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-certificate fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-6 col-md-6 mb-4">
                    <div class="card stats-card-primary h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">تم تصديقها</div>
                                    <div class="text-white h4">${certifiedCount}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-award fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Certifications -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">الممارسات في انتظار التصديق</h5>
                </div>
                <div class="card-body">
                    ${pendingCertifications.length > 0 ? generateCertificationTable(pendingCertifications) : generateEmptyCertificationState()}
                </div>
            </div>
        </div>
    `;
}

function loadAdminDashboard() {
    const totalStudents = mockData.users.filter(u => u.role === 'student').length;
    const totalPractices = mockData.practices.length;
    const pendingPractices = mockData.practices.filter(p => p.status === 'pending').length;
    const approvedPractices = mockData.practices.filter(p => p.status === 'approved').length;
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">مرحباً ${currentUser.name}</h1>
                <span class="badge bg-danger fs-6">مدير النظام</span>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">إجمالي الطلبة</div>
                                    <div class="text-white h4">${totalStudents}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-users fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-info h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">إجمالي الممارسات</div>
                                    <div class="text-white h4">${totalPractices}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-list fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-warning h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">في الانتظار</div>
                                    <div class="text-white h4">${pendingPractices}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-clock fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card stats-card-success h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="text-white-75 small">معتمدة</div>
                                    <div class="text-white h4">${approvedPractices}</div>
                                </div>
                                <div class="text-white-50">
                                    <i class="fas fa-check-circle fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">النشاط الأخير</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>الطالب</th>
                                    <th>الممارسة</th>
                                    <th>الحالة</th>
                                    <th>التاريخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generateAdminActivityTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generatePracticesTable(practices) {
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>العنوان</th>
                        <th>نوع الممارسة</th>
                        <th>المؤسسة</th>
                        <th>الحالة</th>
                        <th>النقاط</th>
                        <th>تاريخ الإرسال</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${practices.map(practice => {
                        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
                        return `
                            <tr>
                                <td><strong>${practice.title}</strong></td>
                                <td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td>
                                <td>${practice.organization}</td>
                                <td>
                                    <span class="badge ${getStatusBadgeClass(practice.status)}">
                                        ${getStatusText(practice.status)}
                                    </span>
                                </td>
                                <td><strong class="text-primary">${practice.calculated_points}</strong></td>
                                <td>${formatDate(practice.created_at)}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="viewPractice(${practice.id})">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    ${practice.status === 'pending' ? `
                                        <button class="btn btn-sm btn-outline-warning" onclick="editPractice(${practice.id})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    ` : ''}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateEmptyState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-clipboard-list text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">لا توجد ممارسات مهنية</h4>
            <p class="text-muted">ابدأ بإضافة أول ممارسة مهنية لك</p>
            <button class="btn btn-primary" onclick="loadPage('add-practice')">
                <i class="fas fa-plus me-2"></i>
                إضافة ممارسة جديدة
            </button>
        </div>
    `;
}

function generateReviewTable(practices) {
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>الطالب</th>
                        <th>العنوان</th>
                        <th>نوع الممارسة</th>
                        <th>المؤسسة</th>
                        <th>تاريخ الإرسال</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${practices.map(practice => {
                        const student = mockData.users.find(u => u.id === practice.user_id);
                        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
                        return `
                            <tr>
                                <td>${student ? student.name : 'غير محدد'}</td>
                                <td><strong>${practice.title}</strong></td>
                                <td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td>
                                <td>${practice.organization}</td>
                                <td>${formatDate(practice.created_at)}</td>
                                <td>
                                    <button class="btn btn-sm btn-success" onclick="reviewPractice(${practice.id}, 'approve')">
                                        <i class="fas fa-check"></i> موافقة
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="reviewPractice(${practice.id}, 'reject')">
                                        <i class="fas fa-times"></i> رفض
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateEmptyReviewState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-search text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">لا توجد ممارسات للمراجعة</h4>
            <p class="text-muted">جميع الممارسات تم مراجعتها</p>
        </div>
    `;
}

function generateApprovalTable(practices) {
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>الطالب</th>
                        <th>العنوان</th>
                        <th>نوع الممارسة</th>
                        <th>المؤسسة</th>
                        <th>النقاط المحسوبة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${practices.map(practice => {
                        const student = mockData.users.find(u => u.id === practice.user_id);
                        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
                        return `
                            <tr>
                                <td>${student ? student.name : 'غير محدد'}</td>
                                <td><strong>${practice.title}</strong></td>
                                <td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td>
                                <td>${practice.organization}</td>
                                <td><strong class="text-primary">${practice.calculated_points}</strong></td>
                                <td>
                                    <button class="btn btn-sm btn-success" onclick="approvePractice(${practice.id}, 'approve')">
                                        <i class="fas fa-stamp"></i> اعتماد
                                    </button>
                                    <button class="btn btn-sm btn-warning" onclick="approvePractice(${practice.id}, 'return')">
                                        <i class="fas fa-undo"></i> إرجاع
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateEmptyApprovalState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-stamp text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">لا توجد ممارسات للاعتماد</h4>
            <p class="text-muted">جميع الممارسات تم اعتمادها</p>
        </div>
    `;
}

function generateCertificationTable(practices) {
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>الطالب</th>
                        <th>العنوان</th>
                        <th>نوع الممارسة</th>
                        <th>المؤسسة</th>
                        <th>النقاط</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${practices.map(practice => {
                        const student = mockData.users.find(u => u.id === practice.user_id);
                        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
                        return `
                            <tr>
                                <td>${student ? student.name : 'غير محدد'}</td>
                                <td><strong>${practice.title}</strong></td>
                                <td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td>
                                <td>${practice.organization}</td>
                                <td><strong class="text-primary">${practice.calculated_points}</strong></td>
                                <td>
                                    <button class="btn btn-sm btn-primary" onclick="certifyPractice(${practice.id}, 'certify')">
                                        <i class="fas fa-certificate"></i> تصديق
                                    </button>
                                    <button class="btn btn-sm btn-warning" onclick="certifyPractice(${practice.id}, 'return')">
                                        <i class="fas fa-undo"></i> إرجاع
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateEmptyCertificationState() {
    return `
        <div class="text-center py-5">
            <i class="fas fa-certificate text-muted" style="font-size: 4rem;"></i>
            <h4 class="text-muted mt-3">لا توجد ممارسات للتصديق</h4>
            <p class="text-muted">جميع الممارسات تم تصديقها</p>
        </div>
    `;
}

function generateAdminActivityTable() {
    return mockData.practices.map(practice => {
        const student = mockData.users.find(u => u.id === practice.user_id);
        return `
            <tr>
                <td>${student ? student.name : 'غير محدد'}</td>
                <td>${practice.title}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(practice.status)}">
                        ${getStatusText(practice.status)}
                    </span>
                </td>
                <td>${formatDate(practice.created_at)}</td>
            </tr>
        `;
    }).join('');
}

// Page loading functions
function loadPage(page) {
    // Update active navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
    
    switch (page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'practices':
            loadPracticesPage();
            break;
        case 'add-practice':
            loadAddPracticePage();
            break;
        case 'reports':
            loadReportsPage();
            break;
        case 'settings':
            loadSettingsPage();
            break;
    }
}

function loadPracticesPage() {
    let practices;
    if (currentUser.role === 'student') {
        practices = mockData.practices.filter(p => p.user_id === currentUser.id);
    } else {
        practices = mockData.practices;
    }
    
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">${currentUser.role === 'student' ? 'ممارساتي المهنية' : 'الممارسات المهنية'}</h1>
                ${currentUser.role === 'student' ? `
                    <button class="btn btn-success" onclick="loadPage('add-practice')">
                        <i class="fas fa-plus me-2"></i>
                        إضافة ممارسة جديدة
                    </button>
                ` : ''}
            </div>

            <!-- Filters -->
            <div class="card mb-4">
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <label class="form-label">البحث</label>
                            <input type="text" class="form-control" id="searchInput" placeholder="ابحث في العنوان أو المؤسسة...">
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">الحالة</label>
                            <select class="form-select" id="statusFilter">
                                <option value="">جميع الحالات</option>
                                <option value="pending">في الانتظار</option>
                                <option value="under_review">قيد المراجعة</option>
                                <option value="approved">معتمد</option>
                                <option value="rejected">مرفوض</option>
                                <option value="certified">مصدق</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">من تاريخ</label>
                            <input type="date" class="form-control" id="fromDate">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">إلى تاريخ</label>
                            <input type="date" class="form-control" id="toDate">
                        </div>
                        <div class="col-md-1">
                            <label class="form-label">&nbsp;</label>
                            <button type="button" class="btn btn-primary w-100" onclick="filterPractices()">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Practices List -->
            <div class="card">
                <div class="card-body" id="practicesTableContainer">
                    ${practices.length > 0 ? generateFullPracticesTable(practices) : generateEmptyState()}
                </div>
            </div>
        </div>
    `;
}

function generateFullPracticesTable(practices) {
    return `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        ${currentUser.role !== 'student' ? '<th>الطالب</th>' : ''}
                        <th>العنوان</th>
                        <th>نوع الممارسة</th>
                        <th>نوع المشاركة</th>
                        <th>المستوى</th>
                        <th>المؤسسة</th>
                        <th>فترة الممارسة</th>
                        <th>الحالة</th>
                        <th>النقاط</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    ${practices.map(practice => {
                        const student = mockData.users.find(u => u.id === practice.user_id);
                        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
                        const participationType = mockData.participationTypes.find(pt => pt.id === practice.participation_type_id);
                        const participationLevel = mockData.participationLevels.find(pl => pl.id === practice.participation_level_id);
                        
                        return `
                            <tr>
                                ${currentUser.role !== 'student' ? `<td>${student ? student.name : 'غير محدد'}</td>` : ''}
                                <td>
                                    <div>
                                        <strong>${practice.title}</strong>
                                    </div>
                                    ${practice.description ? `<small class="text-muted">${practice.description.substring(0, 50)}...</small>` : ''}
                                </td>
                                <td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td>
                                <td>${participationType ? participationType.name_ar : 'غير محدد'}</td>
                                <td>${participationLevel ? participationLevel.name_ar : 'غير محدد'}</td>
                                <td>${practice.organization}</td>
                                <td>
                                    <small>
                                        من: ${formatDate(practice.start_date)}<br>
                                        إلى: ${formatDate(practice.end_date)}
                                    </small>
                                </td>
                                <td>
                                    <span class="badge ${getStatusBadgeClass(practice.status)}">
                                        ${getStatusText(practice.status)}
                                    </span>
                                </td>
                                <td><strong class="text-primary">${practice.calculated_points}</strong></td>
                                <td>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button class="btn btn-outline-primary" onclick="viewPractice(${practice.id})" title="عرض">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${practice.status === 'pending' && currentUser.role === 'student' ? `
                                            <button class="btn btn-outline-warning" onclick="editPractice(${practice.id})" title="تعديل">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                        ` : ''}
                                        ${currentUser.role === 'reviewer' && practice.status === 'pending' ? `
                                            <button class="btn btn-outline-info" onclick="showReviewModal(${practice.id})" title="مراجعة">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        ` : ''}
                                        ${currentUser.role === 'approver' && practice.status === 'under_review' ? `
                                            <button class="btn btn-outline-success" onclick="showApproveModal(${practice.id})" title="اعتماد">
                                                <i class="fas fa-stamp"></i>
                                            </button>
                                        ` : ''}
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadAddPracticePage() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">إضافة ممارسة مهنية جديدة</h1>
                <button class="btn btn-outline-secondary" onclick="loadPage('practices')">
                    <i class="fas fa-arrow-right me-2"></i>
                    العودة للقائمة
                </button>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">معلومات الممارسة المهنية</h5>
                        </div>
                        <div class="card-body">
                            <form id="addPracticeForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="practice_type_id" class="form-label">نوع الممارسة <span class="text-danger">*</span></label>
                                        <select class="form-select" name="practice_type_id" id="practice_type_id" required>
                                            <option value="">اختر نوع الممارسة</option>
                                            ${mockData.practiceTypes.map(type => `
                                                <option value="${type.id}">${type.name_ar}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <label for="participation_type_id" class="form-label">نوع المشاركة <span class="text-danger">*</span></label>
                                        <select class="form-select" name="participation_type_id" id="participation_type_id" required>
                                            <option value="">اختر نوع المشاركة</option>
                                            ${mockData.participationTypes.map(type => `
                                                <option value="${type.id}">${type.name_ar}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="participation_level_id" class="form-label">مستوى المشاركة <span class="text-danger">*</span></label>
                                    <select class="form-select" name="participation_level_id" id="participation_level_id" required>
                                        <option value="">اختر مستوى المشاركة</option>
                                        ${mockData.participationLevels.map(level => `
                                            <option value="${level.id}">${level.name_ar}</option>
                                        `).join('')}
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="title" class="form-label">عنوان الممارسة <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="title" id="title" required>
                                </div>

                                <div class="mb-3">
                                    <label for="organization" class="form-label">المؤسسة/الجهة المنظمة <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="organization" id="organization" required>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">وصف الممارسة</label>
                                    <textarea class="form-control" name="description" id="description" rows="3"></textarea>
                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="start_date" class="form-label">تاريخ البداية <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" name="start_date" id="start_date" required>
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <label for="end_date" class="form-label">تاريخ النهاية <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" name="end_date" id="end_date" required>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="duration_hours" class="form-label">عدد الساعات (اختياري)</label>
                                    <input type="number" class="form-control" name="duration_hours" id="duration_hours" min="1">
                                </div>

                                <div class="d-flex justify-content-end gap-2">
                                    <button type="button" class="btn btn-secondary" onclick="loadPage('practices')">إلغاء</button>
                                    <button type="submit" class="btn btn-success">
                                        <i class="fas fa-save me-2"></i>
                                        حفظ الممارسة
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h6 class="card-title mb-0">إرشادات مهمة</h6>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle me-2"></i>
                                <strong>تذكير:</strong> يجب تقديم الممارسة خلال شهر من تاريخ انتهائها.
                            </div>

                            <h6>الوثائق المطلوبة:</h6>
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>شهادة المشاركة</li>
                                <li><i class="fas fa-check text-success me-2"></i>وثيقة من الجهة المنظمة</li>
                                <li><i class="fas fa-check text-success me-2"></i>صور من الفعالية (اختياري)</li>
                            </ul>

                            <div class="alert alert-warning mt-3">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                <small>سيتم احتساب النقاط تلقائياً بناءً على نوع ومستوى المشاركة المحددة.</small>
                            </div>
                        </div>
                    </div>

                    <!-- Points Calculator Preview -->
                    <div class="card mt-3" id="pointsPreview" style="display: none;">
                        <div class="card-header">
                            <h6 class="card-title mb-0">معاينة النقاط</h6>
                        </div>
                        <div class="card-body">
                            <div class="text-center">
                                <div class="display-4 text-primary" id="previewPoints">0</div>
                                <small class="text-muted">نقطة متوقعة</small>
                            </div>
                            <hr>
                            <div class="small">
                                <div>نوع الممارسة: <span id="previewPracticeType">-</span></div>
                                <div>نوع المشاركة: <span id="previewParticipationType">-</span></div>
                                <div>مستوى المشاركة: <span id="previewParticipationLevel">-</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Setup form handlers
    setupAddPracticeForm();
}

function setupAddPracticeForm() {
    const form = document.getElementById('addPracticeForm');
    const practiceTypeSelect = document.getElementById('practice_type_id');
    const participationTypeSelect = document.getElementById('participation_type_id');
    const participationLevelSelect = document.getElementById('participation_level_id');
    
    // Points preview update
    function updatePointsPreview() {
        const practiceTypeId = parseInt(practiceTypeSelect.value);
        const participationTypeId = parseInt(participationTypeSelect.value);
        const participationLevelId = parseInt(participationLevelSelect.value);

        if (practiceTypeId && participationTypeId && participationLevelId) {
            const practiceType = mockData.practiceTypes.find(pt => pt.id === practiceTypeId);
            const participationType = mockData.participationTypes.find(pt => pt.id === participationTypeId);
            const participationLevel = mockData.participationLevels.find(pl => pl.id === participationLevelId);

            const calculatedPoints = practiceType.base_points * participationType.multiplier * participationLevel.multiplier;

            document.getElementById('previewPoints').textContent = calculatedPoints;
            document.getElementById('previewPracticeType').textContent = practiceType.name_ar;
            document.getElementById('previewParticipationType').textContent = participationType.name_ar;
            document.getElementById('previewParticipationLevel').textContent = participationLevel.name_ar;

            document.getElementById('pointsPreview').style.display = 'block';
        } else {
            document.getElementById('pointsPreview').style.display = 'none';
        }
    }

    practiceTypeSelect.addEventListener('change', updatePointsPreview);
    participationTypeSelect.addEventListener('change', updatePointsPreview);
    participationLevelSelect.addEventListener('change', updatePointsPreview);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const practiceData = {
            id: mockData.practices.length + 1,
            user_id: currentUser.id,
            practice_type_id: parseInt(formData.get('practice_type_id')),
            participation_type_id: parseInt(formData.get('participation_type_id')),
            participation_level_id: parseInt(formData.get('participation_level_id')),
            title: formData.get('title'),
            description: formData.get('description'),
            organization: formData.get('organization'),
            start_date: formData.get('start_date'),
            end_date: formData.get('end_date'),
            duration_hours: formData.get('duration_hours') ? parseInt(formData.get('duration_hours')) : null,
            status: 'pending',
            calculated_points: calculatePoints(
                parseInt(formData.get('practice_type_id')),
                parseInt(formData.get('participation_type_id')),
                parseInt(formData.get('participation_level_id'))
            ),
            created_at: new Date().toISOString().split('T')[0]
        };
        
        mockData.practices.push(practiceData);
        
        showAlert('تم إرسال الممارسة المهنية بنجاح', 'success');
        loadPage('practices');
    });
}

function calculatePoints(practiceTypeId, participationTypeId, participationLevelId) {
    const practiceType = mockData.practiceTypes.find(pt => pt.id === practiceTypeId);
    const participationType = mockData.participationTypes.find(pt => pt.id === participationTypeId);
    const participationLevel = mockData.participationLevels.find(pl => pl.id === participationLevelId);
    
    return practiceType.base_points * participationType.multiplier * participationLevel.multiplier;
}

function loadReportsPage() {
    const pageContent = document.getElementById('pageContent');
    pageContent.innerHTML = `
        <div class="py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1 class="h3 mb-0">التقارير</h1>
            </div>

            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">تقرير الممارسات حسب النوع</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="practiceTypeChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">تقرير الحالات</h5>
                        </div>
                        <div class="card-body">
                            <canvas id="statusChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">تقرير مفصل</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>نوع الممارسة</th>
                                    <th>عدد الممارسات</th>
                                    <th>إجمالي النقاط</th>
                                    <th>متوسط النقاط</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${generateReportTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateReportTable() {
    const reportData = {};
    
    mockData.practices.forEach(practice => {
        const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
        if (practiceType) {
            if (!reportData[practiceType.name_ar]) {
                reportData[practiceType.name_ar] = {
                    count: 0,
                    totalPoints: 0
                };
            }
            reportData[practiceType.name_ar].count++;
            reportData[practiceType.name_ar].totalPoints += practice.calculated_points;
        }
    });
    
    return Object.entries(reportData).map(([typeName, data]) => `
        <tr>
            <td>${typeName}</td>
            <td>${data.count}</td>
            <td>${data.totalPoints}</td>
            <td>${Math.round(data.totalPoints / data.count)}</td>
        </tr>
    `).join('');
}

// Action functions
function viewPractice(practiceId) {
    const practice = mockData.practices.find(p => p.id === practiceId);
    if (!practice) return;
    
    const student = mockData.users.find(u => u.id === practice.user_id);
    const practiceType = mockData.practiceTypes.find(pt => pt.id === practice.practice_type_id);
    const participationType = mockData.participationTypes.find(pt => pt.id === practice.participation_type_id);
    const participationLevel = mockData.participationLevels.find(pl => pl.id === practice.participation_level_id);
    
    showModal('تفاصيل الممارسة المهنية', `
        <div class="row">
            <div class="col-md-6">
                <h6>معلومات الممارسة</h6>
                <table class="table table-borderless">
                    <tr><td><strong>العنوان:</strong></td><td>${practice.title}</td></tr>
                    <tr><td><strong>المؤسسة:</strong></td><td>${practice.organization}</td></tr>
                    <tr><td><strong>نوع الممارسة:</strong></td><td>${practiceType ? practiceType.name_ar : 'غير محدد'}</td></tr>
                    <tr><td><strong>نوع المشاركة:</strong></td><td>${participationType ? participationType.name_ar : 'غير محدد'}</td></tr>
                    <tr><td><strong>مستوى المشاركة:</strong></td><td>${participationLevel ? participationLevel.name_ar : 'غير محدد'}</td></tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6>معلومات إضافية</h6>
                <table class="table table-borderless">
                    <tr><td><strong>الطالب:</strong></td><td>${student ? student.name : 'غير محدد'}</td></tr>
                    <tr><td><strong>تاريخ البداية:</strong></td><td>${formatDate(practice.start_date)}</td></tr>
                    <tr><td><strong>تاريخ النهاية:</strong></td><td>${formatDate(practice.end_date)}</td></tr>
                    <tr><td><strong>الحالة:</strong></td><td><span class="badge ${getStatusBadgeClass(practice.status)}">${getStatusText(practice.status)}</span></td></tr>
                    <tr><td><strong>النقاط:</strong></td><td><strong class="text-primary">${practice.calculated_points}</strong></td></tr>
                </table>
            </div>
        </div>
        ${practice.description ? `
            <div class="mt-3">
                <h6>الوصف</h6>
                <p>${practice.description}</p>
            </div>
        ` : ''}
    `);
}

function editPractice(practiceId) {
    showAlert('ميزة التعديل ستكون متاحة قريباً', 'info');
}

function reviewPractice(practiceId, action) {
    const practice = mockData.practices.find(p => p.id === practiceId);
    if (!practice) return;
    
    if (action === 'approve') {
        practice.status = 'under_review';
        showAlert('تم تحويل الممارسة للاعتماد بنجاح', 'success');
    } else if (action === 'reject') {
        practice.status = 'rejected';
        showAlert('تم رفض الممارسة', 'warning');
    }
    
    loadDashboard();
}

function approvePractice(practiceId, action) {
    const practice = mockData.practices.find(p => p.id === practiceId);
    if (!practice) return;
    
    if (action === 'approve') {
        practice.status = 'approved';
        showAlert('تم اعتماد الممارسة بنجاح', 'success');
    } else if (action === 'return') {
        practice.status = 'pending';
        showAlert('تم إرجاع الممارسة للمراجعة', 'info');
    }
    
    loadDashboard();
}

function certifyPractice(practiceId, action) {
    const practice = mockData.practices.find(p => p.id === practiceId);
    if (!practice) return;
    
    if (action === 'certify') {
        practice.status = 'certified';
        showAlert('تم تصديق الممارسة بنجاح', 'success');
    } else if (action === 'return') {
        practice.status = 'approved';
        showAlert('تم إرجاع الممارسة للاعتماد', 'info');
    }
    
    loadDashboard();
}

function downloadRecord() {
    showAlert('ميزة تحميل السجل ستكون متاحة قريباً', 'info');
}

function filterPractices() {
    showAlert('ميزة التصفية ستكون متاحة قريباً', 'info');
}

// Utility functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('main');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function showModal(title, content) {
    const modalHtml = `
        <div class="modal fade" id="dynamicModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('dynamicModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = new bootstrap.Modal(document.getElementById('dynamicModal'));
    modal.show();
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Copy functionality for login credentials
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check for existing authentication
    checkAuth();
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                showAlert('تم تسجيل الدخول بنجاح', 'success');
            } else {
                showAlert('بيانات تسجيل الدخول غير صحيحة', 'danger');
            }
        });
    }
    
    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordField = document.getElementById('password');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // Copy buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
            const button = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
            const textToCopy = button.getAttribute('data-copy');
            copyToClipboard(textToCopy, button);
        }
    });
    
    // Navigation handlers
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-page')) {
            e.preventDefault();
            loadPage(e.target.getAttribute('data-page'));
        }
    });
    
    // Logout handler
    document.addEventListener('click', function(e) {
        if (e.target.id === 'logoutBtn') {
            e.preventDefault();
            logout();
        }
    });
});

// Global functions for HTML onclick handlers
window.showLandingPage = showLandingPage;
window.showLoginPage = showLoginPage;
window.showMainApp = showMainApp;
window.loadPage = loadPage;
window.logout = logout;
window.scrollToFeatures = scrollToFeatures;
window.viewPractice = viewPractice;
window.editPractice = editPractice;
window.reviewPractice = reviewPractice;
window.approvePractice = approvePractice;
window.certifyPractice = certifyPractice;
window.downloadRecord = downloadRecord;
window.filterPractices = filterPractices;