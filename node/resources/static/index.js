

window.onload = function () {

  function getMethod(radio) {
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        return radio[i].value;
      }
    }
  }

  let dataObject = {};

  // 添加 Key-Value 对
  function addKeyValue() {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;

    if (key && value) {
      dataObject[key] = value;
      updateDataObject();
      clearInputFields();
    } else {
      alert('Please enter both key and value.');
    }
  }

  // 删除 Key-Value 对
  function deleteKeyValue() {
    let key = document.getElementById('key').value;
    delete dataObject[key];
    updateDataObject();
  }

  // 更新显示数据对象
  function updateDataObject() {
    const dataObjectElement = document.getElementById('dataObject');
    dataObjectElement.textContent = JSON.stringify(dataObject, null, 2);
  }

  // 清空输入字段
  function clearInputFields() {
    document.getElementById('key').value = '';
    document.getElementById('value').value = '';
  }

  function resetInputFields() {
    clearInputFields();
    dataObject = {};
    updateDataObject();
  }

  // 初始显示数据对象
  updateDataObject();



  const URLInput = document.getElementById('URLInput');
  const MethodRadio = document.getElementsByName('method');
  const RequestButton = document.getElementById('SendButton');
  const ResponseDiv = document.getElementById('Result');
  const Post = document.getElementById('Post');
  const Get = document.getElementById('Get');
  Post.addEventListener('change', () => {
    if (Post.checked) {
      document.getElementById('KeyValue').style.display = 'block';
    } else {
      document.getElementById('KeyValue').style.display = 'none';
    }
  })
  Get.addEventListener('change', () => {
    if (Get.checked) {
      document.getElementById('KeyValue').style.display = 'none';
    } else {
      document.getElementById('KeyValue').style.display = 'block';
    }
  })

  RequestButton.addEventListener('click', function () {
    const port = 5000;
    const method = getMethod(MethodRadio);
    const url = URLInput.value;
    const request = new XMLHttpRequest();
    request.open(method, `http://localhost:${port}/${url}`, true);
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(dataObject != {} ? JSON.stringify(dataObject) : null);
    console.log(dataObject != {} ? JSON.stringify(dataObject) : null);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          let response = JSON.stringify({
            status: request.status,
            statusText: request.statusText,
            response: JSON.parse(request.response)
          }, null, 2);
          ResponseDiv.innerText = response;
        }
        else {
          let response = JSON.stringify({
            status: request.status,
            statusText: request.statusText,
            response: request.response
          }, null, 2);
          ResponseDiv.innerText = response;
        }
      } else {
        ResponseDiv.innerText = 'Loading...';
      }
    }
  });


  function download1() {
    const url = document.getElementById('URLInput').value; // 下载地址
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // 也可以使用POST方式，根据接口
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.responseType = 'blob'; // 返回类型blob
    xhr.onload = function (e) {
      if (this.status === 200) {
        const blob = this.response;
        console.log(blob);
        const reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
        const disposition = xhr.getResponseHeader('Content-Disposition');
        let filename = '';
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        reader.onload = function (e) {
          const a = document.createElement('a');
          a.download = filename;
          a.href = e.target.result;
          document.documentElement.appendChild(a);
          a.click();
          a.remove(); // 等价于document.documentElement.removeChild(a);
        };
      }
    };
    xhr.send(); // 发送ajax请求
  }

  const AddButton = document.getElementById('addBtn');
  const DeleteButton = document.getElementById('deleteBtn');
  const ResetButton = document.getElementById('resetBtn');
  const download = document.getElementById('download');

  AddButton.addEventListener('click', addKeyValue);
  DeleteButton.addEventListener('click', deleteKeyValue);
  ResetButton.addEventListener('click', resetInputFields);
  download.addEventListener('click', download1);
}