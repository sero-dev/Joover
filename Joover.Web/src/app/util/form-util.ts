export function preventNonNumericalInput(e: KeyboardEvent) {
  e = e || window.event;
  const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which;
  const charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
}
