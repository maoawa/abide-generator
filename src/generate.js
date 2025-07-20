import { snackbar } from "mdui/functions/snackbar.js";

const agreeCheckbox = document.getElementById('agree-checkbox');
const checkboxText = document.getElementById('agree-checkbox-text');
const generateButton = document.getElementById('generate-button');

// 日期字段相关
const dateField = document.getElementById('date-of-degree');
const dateTips = document.getElementById('date-tips');
const initialTipsText = dateTips.textContent;
const pacificDateStr = new Date().toLocaleDateString('en-US', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
dateField.setAttribute('placeholder', pacificDateStr);
dateField.setAttribute('value', pacificDateStr);

// 解析 MM/DD/YYYY
function parseDateMMDDYYYY(str) {
  const [month, day, year] = str.split('/').map(s => parseInt(s, 10));
  if (!month || !day || !year) return null;
  return new Date(year, month - 1, day);
}

function isValidDate(inputVal) {
  const inputDate = parseDateMMDDYYYY(inputVal);
  const pacificNow = parseDateMMDDYYYY(pacificDateStr);
  return (
    inputDate instanceof Date &&
    !isNaN(inputDate.getTime()) &&
    inputVal.match(/^\d{2}\/\d{2}\/\d{4}$/) &&
    inputDate <= pacificNow
  );
}

dateField.addEventListener('input', () => {
  const inputVal = dateField.value.trim();
  if (!isValidDate(inputVal)) {
    dateTips.style.color = '#ff3300';
    dateTips.innerHTML = `⚠️ ${initialTipsText}<br>Click the button on the right to reset to the current time.`;
  } else {
    dateTips.style.color = '';
    dateTips.textContent = initialTipsText;
  }
});

document.getElementById('set-to-current-date').addEventListener('click', () => {
  dateField.value = pacificDateStr;
  dateField.dispatchEvent(new Event('input'));
});

function generateCert() {
  const nameField = document.getElementById('name');
  const degreeSelector = document.getElementById('degree');
  const customDegreeField = document.getElementById('custom-degree-input');
  const fieldSelector = document.getElementById('field-of-study-selector');
  const customFieldField = document.getElementById('custom-field-of-study');
  const dateField = document.getElementById('date-of-degree');

  const name = nameField.value.trim();
  let degree = '', fieldOfStudy = '';

  // === 校验并聚焦空字段 ===
  if (!name) {
    nameField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    nameField.focus();
    return;
  }

  if (!degreeSelector.value) {
    degreeSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
    degreeSelector.focus();
    return;
  }

  if (degreeSelector.value === 'custom') {
    if (!customDegreeField.value.trim()) {
      customDegreeField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      customDegreeField.focus();
      return;
    }
    degree = customDegreeField.value.trim();
  } else {
    const selectedDegreeItem = degreeSelector.querySelector(`mdui-menu-item[value="${degreeSelector.value}"]`);
    degree = selectedDegreeItem ? selectedDegreeItem.textContent.trim() : degreeSelector.value;
  }

  if (!fieldSelector.value) {
    fieldSelector.scrollIntoView({ behavior: 'smooth', block: 'center' });
    fieldSelector.focus();
    return;
  }

  if (fieldSelector.value === 'custom') {
    if (!customFieldField.value.trim()) {
      customFieldField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      customFieldField.focus();
      return;
    }
    fieldOfStudy = customFieldField.value.trim();
  } else {
    fieldOfStudy = fieldSelector.value;
  }

  const dateInput = dateField.value.trim();
  if (!dateInput) {
    dateField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dateField.focus();
    return;
  }

  const [month, day, year] = dateInput.split('/');
  const dateObject = new Date(`${year}-${month}-${day}`);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // === 重定向到带参数的目标网址 ===
  const redirectURL = `https://aui.me/your-degree/?yourname=${encodeURIComponent(name)}&date=${encodeURIComponent(formattedDate)}&yourdegree=${encodeURIComponent(degree)}&study=${encodeURIComponent(fieldOfStudy)}`;
  window.location.href = redirectURL;
}

generateButton.addEventListener('click', () => {
  const isChecked = agreeCheckbox.hasAttribute('checked');

  // 新增：验证时间
  if (!window.isDateValid()) {
    const dateField = document.getElementById('date-of-degree');
    dateField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dateField.focus();
    snackbar({
      message: 'You must provide a valid time before proceeding.',
    });
    return;
  }

  if (!isChecked) {
    checkboxText.style.color = 'red';
    agreeCheckbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    snackbar({
      message: 'You must check "I agree not to use this degree in a way that is unlawful." before proceeding.',
    });
  } else {
    checkboxText.style.color = '';
    generateCert(); // 验证通过后调用
  }
});

// 处理勾选状态颜色清除
agreeCheckbox.addEventListener('click', () => {
  setTimeout(() => {
    if (agreeCheckbox.hasAttribute('checked')) {
      checkboxText.style.color = '';
    }
  }, 0);
});