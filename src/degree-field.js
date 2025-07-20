const degreeSelect = document.getElementById('degree');
const customDegreeDiv = document.getElementById('custom-degree-div');
const fieldOfStudyDiv = document.getElementById('field-of-study');
const customFieldOfStudyDiv = document.getElementById('custom-field-of-study-div');

// 学位与对应的研究领域
const degreeFields = {
  bs: ['Biology', 'Computer Science', 'Mathematics', 'Physics'],
  ms: ['Engineering', 'Data Science', 'Environmental Science'],
  scd: ['Chemistry', 'Applied Mathematics'],
  md: ['Pediatrics', 'Surgery', 'Internal Medicine'],
  ba: ['History', 'Philosophy', 'English Literature', 'Political Science'],
  ma: ['Sociology', 'Linguistics', 'International Relations'],
  phd: ['Neuroscience', 'Economics', 'Philosophy'],
  bfa: ['Graphic Design', 'Painting', 'Photography'],
  mfa: ['Creative Writing', 'Theatre', 'Sculpture'],
  bba: ['Accounting', 'Finance', 'Marketing'],
  mba: ['Finance', 'Entrepreneurship', 'Human Resources'],
  jd: ['Constitutional Law', 'Criminal Law'],
  edd: ['Educational Leadership', 'Curriculum Development'],
};

degreeSelect.addEventListener('change', function () {
  const selected = this.value;

  customDegreeDiv.innerHTML = '';
  fieldOfStudyDiv.innerHTML = '';
  customFieldOfStudyDiv.innerHTML = '';

  if (selected === 'custom') {
    // 自定义学位 + 自定义领域
    customDegreeDiv.innerHTML = `<mdui-text-field label="Custom Degree" id="custom-degree-input" variant="outlined"></mdui-text-field>`;
    fieldOfStudyDiv.innerHTML = `<mdui-text-field label="Field of Study" id="custom-field-of-study" variant="outlined"></mdui-text-field>`;
  } else if (degreeFields[selected]) {
    // 正常学位 -> 显示 field selector + Custom... 选项
    const fields = degreeFields[selected];
    const options = fields.map(f => `<mdui-menu-item value="${f}">${f}</mdui-menu-item>`).join('');
    const fullOptions = options + `<mdui-menu-item value="custom">Custom...</mdui-menu-item>`;

    fieldOfStudyDiv.innerHTML = `
      <mdui-select label="Field of Study" id="field-of-study-selector" variant="outlined">
        ${fullOptions}
      </mdui-select>
    `;

    // 给 field selector 添加事件监听（需要等它渲染完）
    requestAnimationFrame(() => {
      const fieldSelect = document.getElementById('field-of-study-selector');
      fieldSelect.addEventListener('change', function () {
        if (this.value === 'custom') {
          customFieldOfStudyDiv.innerHTML = `<mdui-text-field label="Custom Field of Study" id="custom-field-of-study" variant="outlined"></mdui-text-field>`;
        } else {
          customFieldOfStudyDiv.innerHTML = '';
        }
      });
    });
  }
});