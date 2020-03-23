console.log("hello from the contribute page")

async function addClass() {
  let subjects = await getSubjects()
  var select = $('<select>', {
    html: $.map(subjects, function(subject) {
        return '<option value="' + subject._id + '">' + subject.name + '</option>';
    })
  })
  select.attr({name: 'subjectId'})
  var div = document.createElement('div')
  div.setAttribute('class', 'class')
  select.appendTo(div)
  var classInput = $('<input>').attr({
      type: 'text',
      placeholder: 'Class name',
      name: 'name'
  })
  var linkInput = $('<input>').attr({
    type: 'text',
    placeholder: 'Link',
    name: 'link'
  })  
  var deleteButton = $('<button>', {
    html: 'x'
  }).attr({
    class: 'delete-btn',
    onClick: 'deleteClass.call(this)'
  })
  classInput.appendTo(div)
  linkInput.appendTo(div)
  deleteButton.appendTo(div)
  $('#addClasses').append(div)
}

function submitClasses() {
  var data = []
  $('#addClasses').children().each(function() {
    var newClass = {}
    $(this).children('select').each(function() {
      newClass = {...newClass, [this.name]:this.value}
    })
    $(this).children('input').each(function() {
      newClass = {...newClass, [this.name]:this.value}
    })
    data.push(newClass)
  })

  data.forEach(async (newClass) => {
    await postClass(newClass)
  });

  window.location.href = '/';
}

var deleteClass = function() {
  $(this).parent('div').remove()
}


async function getSubjects() {
  return fetch('http://localhost:3002/api/subjects')
  .then((response) => response.json())
}

async function postClass(newClass) {
  return $.post("/api/classes", newClass)
  .then(newClass => {
    console.log(newClass)
  })
}