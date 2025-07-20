const dateField = document.getElementById('date-of-degree');
const dateTips = document.getElementById('date-tips');

// 获取当前太平洋时间（MM/DD/YYYY 格式）
const pacificDateStr = new Date().toLocaleDateString('en-US', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
dateField.setAttribute('placeholder', pacificDateStr);
dateField.setAttribute('value', pacificDateStr);

// 保存初始提示纯文本内容
const initialTipsText = dateTips.textContent;

// 将 MM/DD/YYYY 字符串转为 Date 对象
function parseDateMMDDYYYY(str) {
  const [month, day, year] = str.split('/').map(s => parseInt(s, 10));
  if (!month || !day || !year) return null;
  return new Date(year, month - 1, day);
}

// 实时校验输入
dateField.addEventListener('input', () => {
  const inputVal = dateField.value.trim();
  const inputDate = parseDateMMDDYYYY(inputVal);
  const pacificNow = parseDateMMDDYYYY(pacificDateStr);

  const isValid =
    inputDate instanceof Date &&
    !isNaN(inputDate.getTime()) && // 合法日期
    inputVal.match(/^\d{2}\/\d{2}\/\d{4}$/) && // 正则匹配格式
    inputDate <= pacificNow; // 不晚于现在

  if (!isValid) {
    dateTips.style.color = '#ff3300';
    dateTips.innerHTML = `⚠️ ${initialTipsText}<br>Click the button on the right to reset to the current time.`;
  } else {
    dateTips.style.color = '';
    dateTips.textContent = initialTipsText;
  }
});

const resetBtn = document.getElementById('set-to-current-date');

resetBtn.addEventListener('click', () => {
  dateField.value = pacificDateStr;  // 设置输入框当前时间
  dateField.dispatchEvent(new Event('input')); // 触发input事件，触发校验
});

// 保持现有代码不变，新增一个全局函数暴露校验结果

window.isDateValid = function () {
  const inputVal = dateField.value.trim();
  const inputDate = parseDateMMDDYYYY(inputVal);
  const pacificNow = parseDateMMDDYYYY(pacificDateStr);

  return (
    inputDate instanceof Date &&
    !isNaN(inputDate.getTime()) &&
    inputVal.match(/^\d{2}\/\d{2}\/\d{4}$/) &&
    inputDate <= pacificNow
  );
};