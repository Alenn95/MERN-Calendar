import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsDate } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {


        try {
            if (calendarEvent.id) {
                //Actualizando

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            //Creando Evento
            const { data } = await calendarApi.post('/events', calendarEvent)
            console.log({ data })
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))

        } catch (error) {
            console.log(error)
            Swal.fire('Error al gaurdar', error.response.data.msg, 'error');

        }



    }

    const startDeletingEvent = async (calendarEvent) => {

        try {

            await calendarApi.delete(`/events/${calendarEvent.id}`)
            dispatch(onDeleteEvent());

        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.respose.data.msg, 'error')
        }




    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events')
            const events = convertEventsDate(data.events);
            dispatch(onLoadEvents(events));


        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }


    return {

        //Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //Métodos

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}
