import { useSelector } from "react-redux";
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {


    const { startDeletingEvent, hasEventSelected, activeEvent } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleDelete = () => {

        startDeletingEvent(activeEvent);
    }




    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
            style={{
                display: hasEventSelected && !isDateModalOpen ? '' : 'none'
            }}
        >
            <i className='fas fa-trash-alt '></i>
        </button>
    )
} 
