from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from .enums import TaskStatus, TaskPriority
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    api_key = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    subscription_id = Column(String, nullable=True)
    credits = Column(Integer, default=100)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    requests = relationship("APIRequest", back_populates="user")
    tasks = relationship("Task", back_populates="user")
    projects = relationship("Project", back_populates="user")
    subscription = relationship("Subscription", back_populates="user")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    user = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String, nullable=True)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.TODO)
    priority = Column(SQLEnum(TaskPriority), default=TaskPriority.MEDIUM)
    due_date = Column(DateTime, nullable=True)
    estimated_hours = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    user_id = Column(Integer, ForeignKey("users.id"))
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    parent_task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    
    user = relationship("User", back_populates="tasks")
    project = relationship("Project", back_populates="tasks")
    parent_task = relationship("Task", remote_side=[id], backref="subtasks")
    tags = relationship("TaskTag", back_populates="task")
    ai_suggestions = relationship("AISuggestion", back_populates="task")

class TaskTag(Base):
    __tablename__ = "task_tags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    
    task = relationship("Task", back_populates="tags")

class AISuggestion(Base):
    __tablename__ = "ai_suggestions"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    suggestion = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_applied = Column(Boolean, default=False)
    
    task = relationship("Task", back_populates="ai_suggestions")

class APIRequest(Base):
    __tablename__ = "api_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    endpoint = Column(String)
    method = Column(String)
    status_code = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    tokens_used = Column(Integer, default=0)
    model = Column(String)
    
    user = relationship("User", back_populates="requests")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    stripe_subscription_id = Column(String, unique=True)
    plan_id = Column(String)
    status = Column(String)
    current_period_end = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="subscription") 