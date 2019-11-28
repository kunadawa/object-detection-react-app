import should from "should";
import {getEventLists, generateEventRows, addEvent, setEventList, pixelDimsForBoundingBox, reshapeDetectionBox} from "./event-utils";

describe("event-utils ", () => {
    it('addEvent when state does not contain any events', () => {
        // streamStatus should be initialized to empty object
        const oldState = {events: {}};
        const instanceName = 'test';
        const source = 'https://streamX';
        const data = {some: 'data'};
        // 'events' keys will be instance ids/names then have nested source:frame-count objects
        const eventData = {instanceName, source, frameCount: 1109}; // left out other data fields
        const expectedEvents = {[instanceName]: {[source]: [eventData]}};
        const newState = addEvent(oldState, eventData);

        should.exist(newState);
        newState.events.should.deepEqual(expectedEvents)
    });

    it('addEvent when state contains similar instance & source events', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const frameCount = 11;
        const initialData = {some: 'initial-data'};
        const oldState = {
            events: {[instanceName]: {[source]: [initialData]}}
        };
        const newFrameCount = 45;
        // 'events' keys will be instance ids/names then have nested source:frame-count objects
        const eventData = {instanceName, source, frameCount: newFrameCount}; // left out other data fields
        const expectedEvents = {[instanceName]: {[source]: [initialData, eventData]}};
        const newState = addEvent(oldState, eventData);

        should.exist(newState);
        newState.events.should.deepEqual(expectedEvents)
    });

    it('addEvent when state contains similar instance, but different source events', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const frameCount = 11;
        const initialData = {some: 'initial-data'};
        const oldState = {
            events: {[instanceName]: {[source]: [initialData]}}
        };
        const newFrameCount = 51;
        const newSource = "file://here/there";
        // 'events' keys will be instance ids/names then have nested source:frame-count objects
        const eventData = {instanceName, source: newSource, frameCount: newFrameCount}; // left out other data fields
        const expectedEvents = {[instanceName]: {[source]: [initialData], [newSource]: [eventData]}};
        const newState = addEvent(oldState, eventData);

        should.exist(newState);
        newState.events.should.deepEqual(expectedEvents)
    });

    it('addEvent when state contains different instance & source events', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const frameCount = 11;
        const initialData = {some: 'initial-data'};
        const oldState = {
            events: {[instanceName]: {[source]: [initialData]}}
        };
        const newFrameCount = 51;
        const newSource = "file://here/there";
        const newInstance = "area 51";
        // 'events' keys will be instance ids/names then have nested source:frame-count objects\
        const eventData = {instanceName: newInstance, source: newSource, frameCount: newFrameCount}; // left out other data fields
        const expectedStreamStatus = {
            [instanceName]: {[source]: [initialData]},
            [newInstance]: {[newSource]: [eventData]}
        };
        const newState = addEvent(oldState, eventData);

        should.exist(newState);
        newState.events.should.deepEqual(expectedStreamStatus)
    });

    it('getEventLists returns each unique instance & source event list', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const initialData = {some: 'initial-data'};

        const newFrameCount = 51;
        const newSource = "file://here/there";
        const newInstance = "area 51";
        // 'events' keys will be instance ids/names then have nested source:frame-count objects\
        const eventData = {instanceName: newInstance, source: newSource, frameCount: newFrameCount}; // left out other data fields
        const eventsState = {[instanceName]: {[source]: [initialData]}, [newInstance]: {[newSource]: [eventData]}};

        const eventLists = getEventLists(eventsState);
        should.exist((eventLists))
        eventLists.should.deepEqual([[initialData], [eventData]])
    });

    it('getEventLists returns each unique source event list for a given instance', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const initialData = {some: 'initial-data'};

        const newFrameCount = 51;
        const newSource = "file://here/there";
        // 'events' keys will be instance ids/names then have nested source:frame-count objects\
        const eventData = {instanceName: instanceName, source: newSource, frameCount: newFrameCount}; // left out other data fields
        const eventsState = {[instanceName]: {[source]: [initialData], [newSource]: [eventData]}};

        const eventLists = getEventLists(eventsState);
        should.exist((eventLists))
        eventLists.should.deepEqual([[initialData], [eventData]])
    });

    it('getEventLists returns each unique source event list for a one source, one instance', () => {
        const instanceName = 'test';
        const source = 'https://streamX';
        const initialData = {some: 'initial-data'};

        const eventsState = {[instanceName]: {[source]: [initialData]}};

        const eventLists = getEventLists(eventsState);
        should.exist((eventLists))
        eventLists.should.deepEqual([[initialData]])
    });

    it('generateEventRows returns the expected value (array split into row size)', () => {
        const numbers = [...Array(10).keys()]
        const rows = generateEventRows(numbers, 3);
        should.exist(rows)
        rows.should.be.length(4)
        rows[0].should.deepEqual([0, 1, 2])
        rows[3].should.deepEqual([9])
    })

    it('generateEventRows returns the expected value (array split into row size) for array of one element', () => {
        const numbers = [1649]
        const rows = generateEventRows(numbers, 3);
        should.exist(rows)
        rows.should.be.length(1)
        rows[0].should.deepEqual([1649])
    })


    it('generateEventRows returns the expected value (array split into row size) for nested arrays', () => {
        const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11], [12], [13, 14, 15, 16], [17]]
        const rows = generateEventRows(numbers, 3);
        should.exist(rows)
        //rows.should.be.length(3)
        rows[1].should.deepEqual([[10, 11], [12], [13, 14, 15, 16]])
        rows[2].should.deepEqual([[17]]);
    })

    it('setEventList replaces the correct list for a single instance and source', () => {
        const instanceName = 'inst01';
        const source = 'src01';
        const oldState = {
           events: {
              [instanceName] : {
                   [source]:[{a:'b'}, {c:'d'}],
               }
           }
        }
        const eventList =  [{i:'j'}, {k:'l'}];
        const newState = setEventList(eventList, instanceName, source, oldState);
        expect(newState).not.toBeUndefined();
        newState.events[instanceName][source].should.deepEqual(eventList);
        newState.events[instanceName].should.be.size(1);
    });

    it('setEventList replaces the correct list where multiple instances exists', () => {
        const instanceName = 'inst02';
        const source = 'src03';
        const oldState = {
           events: {
              ['inst01'] : {
                   ['src01']:[{a:'b'}, {c:'d'}],
                   'src02':[{e:'f'}, {g:'h'}]
               },
               [instanceName]: {
                  [source]:[{i:'j'}, {k:'l'}],
                   'src04':[{m:'n'}, {o:'p'}]
               }
           }
        }
        const eventList =  [{q:'r'}, {s:'t'}];
        const newState = setEventList(eventList, instanceName, source, oldState);
        expect(newState).not.toBeUndefined();
        newState.events[instanceName][source].should.deepEqual(eventList);
    });

    it ('pixelDimsForBoundingBox() gives the accurate pixel data', () => {
        const {top, left, width, height} = pixelDimsForBoundingBox([0.1, 0.2, 0.5, 0.9], 100, 200);
        top.should.equal(10);
        left.should.equal(40);
        width.should.equal(140);
        height.should.equal(40);
    })

    it ('reshapeDetectionBox() work as expected', () => {
        const result = reshapeDetectionBox([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [2, 5]);
        should.exist(result);
        result.should.be.length(2);
        result[0].should.deepEqual([1, 2, 3, 4, 5]);
        result[1].should.deepEqual([6, 7, 8, 9, 10]);
    })
})