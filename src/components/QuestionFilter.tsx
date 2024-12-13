import React from 'react';

interface QuestionFilterProps {
  subjects: string[];
  classes: string[];
  selectedSubject: string;
  selectedClass: string;
  onSubjectChange: (subject: string) => void;
  onClassChange: (className: string) => void;
}

export function QuestionFilter({
  subjects,
  classes,
  selectedSubject,
  selectedClass,
  onSubjectChange,
  onClassChange
}: QuestionFilterProps) {
  return (
    <div className="flex space-x-4">
      <select
        value={selectedSubject}
        onChange={(e) => onSubjectChange(e.target.value)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Subjects</option>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      <select
        value={selectedClass}
        onChange={(e) => onClassChange(e.target.value)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">All Classes</option>
        {classes.map(cls => (
          <option key={cls} value={cls}>{cls}</option>
        ))}
      </select>
    </div>
  );
}