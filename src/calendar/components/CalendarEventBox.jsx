

export const CalendarEventBox = ({event}) => {

    const {title,user} = event;

  
  return (
    <>
    <strong className="me-2">{title}</strong>
    <span>-Usuario: {user.name}</span>
    </>
  )
}
