import React from 'react'
// https://stackoverflow.com/a/51571404/315385
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import should from 'should'

import EventList from './EventList'

Enzyme.configure({adapter: new Adapter()});

describe ("<EventList/>", () => {
    it("should render info msg when there are no events", () => {
        const list = shallow(<EventList />);
        list.find('span').should.have.length(1)
        list.find('span').text().should.equal("No events available")
    });

    const framePath = '/relative/path';
    const framePath2 = '/relative/path2';

    const event1 = {
        detectionBoxes:{
            numbers:[ 0.3106740713119507, 0.09698716551065445, 0.8693511486053467, 0.29769110679626465]
        },
        stringMap:{frame_path: framePath},
        "detectionScores": [0.9220165014266968],
        "categoryIndex": {"1": "person"},
        "detectionClasses": [1],
    };

    const event2 = {
        detectionBoxes:{
            numbers:[0.30294761061668396, 0.05614370107650757, 0.8669027090072632, 0.28341057896614075, 0.2969774305820465, 0.3013843894004822, 0.8314237594604492, 0.4671176075935364]
        },
        stringMap:{frame_path: framePath2},
        "detectionScores": [0.9401428699493408, 0.937097430229187],
        "categoryIndex": {"1": "person"},
        "detectionClasses": [1, 1],
    };

    it("should render the last image on the event list when event list is supplied", () => {
        // both events belong to same instance, source
        const instanceName = 'localhost';
        const source = "video1";
        const streamHost = `http://${instanceName}`
        const events = [event1, event2].map(event => ({...event, instanceName, source}))
        const list = shallow(<EventList events={events} streamHost={streamHost}/>);
        list.exists(`div img[src='${streamHost}${framePath2}']`).should.be.true()
        list.find('div span').at(0).text().should.not.be.empty(`${instanceName} - ${source}`)
    })

    it("should show the number of unseen messages with a 'danger' background", () => {
        const event01 = {seen:false, stringMap:{frame_path: 'framePath01'}};
        // mark these events as seen
        const seen = true;
        const events = [event1, event2].map(event => ({...event, seen}))
        const list = shallow(<EventList events={[...events, event01]}/>);
        list.find('div span').at(1).text().should.equal('1')
        list.find('div span').at(1).prop('className').startsWith('col bg-danger').should.be.true();
    })

    it("should show '0' for unseen messages if none found, with 'info' background", () => {
        const event01 = {seen:true, stringMap:{frame_path: 'framePath01'}};
        // mark these events as seen
        const seen = true;
        const events = [event1, event2].map(event => ({...event, seen}))
        const list = shallow(<EventList events={[...events, event01]}/>);
        list.find('div span').at(1).text().should.equal('0');
        list.find('div span').at(1).prop('className').startsWith('col bg-info').should.be.true();
    })
})