/**
 * iterate through the data structure and return a list for every unique instance-source combination
 * @param eventsState - an object that has instance ids/names as keys then have nested source:[event list] objects
 * @returns {Array}
 */
function getEventLists (eventsState) {
    let lists = [];
    Object.keys(eventsState).map(instanceName => {
      return Object.keys(eventsState[instanceName]).map(source => lists = lists.concat([eventsState[instanceName][source]]))
    });
    return lists;
}

/**
 * split the given events into a list of arrays of at most size rowSize
 * @param events -  a list of events
 * @param rowSize - number of events
 */
function generateEventRows(events, rowSize) {
    const rows = [];

    for (let i = 0; i < events.length; i+=rowSize) {
        const currentRow = [];
        for (let j = 0; j < rowSize; j++) {
            const index = i+j;
            if (index < events.length) {
                currentRow.push(events[index]);
            } else {
                continue;
            }
        }
        rows.push(currentRow)
    }
    return rows;
}

/**
 * add an event to  state, to a unique list for each instance-source combination
 * @param oldState - the old state
 * @param eventData - event data from a server sent event
 */
function addEvent(oldState, eventData) {
    return {
          ...oldState,
          events: {
            ...oldState.events,
            [eventData.instanceName]: {
                ...oldState.events[eventData.instanceName],
                [eventData.source]:
                    typeof(oldState.events[eventData.instanceName]) === 'undefined'
                        ?
                        [eventData]
                        :
                        typeof(oldState.events[eventData.instanceName][eventData.source]) === 'undefined'
                            ?
                            [eventData]
                            :
                            oldState.events[eventData.instanceName][eventData.source].concat(eventData)
            }
          }
      };
  }

  export {generateEventRows, addEvent, getEventLists};