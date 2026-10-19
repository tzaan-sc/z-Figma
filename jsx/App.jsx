import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Toast from './components/common/Toast';

// Student screens
import StudentAssignmentList from './components/student/StudentAssignmentList';
import CodeWorkspace from './components/student/CodeWorkspace';
import SubmissionResultView from './components/student/SubmissionResultView';
import StudentGradebook from './components/student/StudentGradebook';

// Teacher screens
import TeacherAssignmentManager from './components/teacher/TeacherAssignmentManager';
import SubmissionsList from './components/teacher/SubmissionsList';
import GradingWorkspace from './components/teacher/GradingWorkspace';
import TeacherClassManager from './components/teacher/TeacherClassManager';

// Academic Admin screens
import UserManagement from './components/admin/UserManagement';
import ClassManagement from './components/admin/ClassManagement';
import DepartmentManagement from './components/admin/DepartmentManagement';

// IT System Admin screens
import AISettings from './components/system/AISettings';
import DockerSandboxManager from './components/system/DockerSandboxManager';
import SystemLogs from './components/system/SystemLogs';

function MainLayout() {
  const { currentTab, setCurrentTab, teacherSubmissions } = useApp();
  const [selectedSubForGrading, setSelectedSubForGrading] = useState(teacherSubmissions[0]);

  const renderContent = () => {
    switch (currentTab) {
      // Student
      case 'assignments':
        return <StudentAssignmentList />;
      case 'workspace':
        return <CodeWorkspace />;
      case 'result-view':
        return <SubmissionResultView />;
      case 'gradebook':
        return <StudentGradebook />;

      // Teacher
      case 'teacher-assignments':
        return <TeacherAssignmentManager />;
      case 'teacher-submissions':
        return (
          <SubmissionsList 
            onOpenGrading={(sub) => {
              setSelectedSubForGrading(sub);
              setCurrentTab('teacher-grading');
            }} 
          />
        );
      case 'teacher-grading':
        return (
          <GradingWorkspace 
            submission={selectedSubForGrading || teacherSubmissions[0]} 
            onBack={() => setCurrentTab('teacher-submissions')} 
          />
        );
      case 'teacher-classes':
        return <TeacherClassManager />;

      // Academic Admin & Department Admin
      case 'admin-users':
        return <UserManagement />;
      case 'admin-classes':
        return <ClassManagement />;
      case 'admin-departments':
        return <DepartmentManagement />;

      // IT System Admin
      case 'sys-ai':
        return <AISettings />;
      case 'sys-docker':
        return <DockerSandboxManager />;
      case 'sys-logs':
        return <SystemLogs />;

      default:
        return <StudentAssignmentList />;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <main className="page-body">
          {renderContent()}
        </main>
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
