'use strict'

exports.html = (data) => {
  const master = data.master
  const masters = getFullNames(master.masters)
  const apprentices = getFullNames(master.apprentices)
  return `
  <h2>${master.fullname || master.firstName}</h2>
  <ul>
    <li>Origin: ${master.origin || ''}</li>
    <li>Skills: ${master.skills.join(', ')}</li>
    <li>Masters: ${masters.join(', ')}</li>
    <li>Apprentices: ${apprentices.join(', ')}</li>
    <li>Level: ${master.level || ''}</li>
    <li>Email: ${master.email || ''}</li>
    <li>Phone: ${master.phone || ''}</li>
    <li>Created: ${master.createdOn || ''}</li>
  </ul>
  `
}

exports.text = (data) => {
  const master = data.master
  const masters = getFullNames(master.masters)
  const apprentices = getFullNames(master.apprentices)
  return `
  ${master.fullname || master.firstName}
  ==================

  Origin: ${master.origin || ''}
  Skills: ${master.skills.join(', ')}
  Masters: ${masters.join(', ')}
  Apprentices: ${apprentices.join(', ')}
  Level: ${master.level || ''}
  Email: ${master.email || ''}
  Phone: ${master.phone || ''}
  `
}

function getFullNames (masters) {
  return masters.map((master) => {
    return master ? master.fullname : ''
  })
}
