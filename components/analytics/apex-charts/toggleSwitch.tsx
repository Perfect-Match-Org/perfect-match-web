import React, { Component } from 'react';
import AgePrefFemale from './agePrefFemale';
import AgePrefMale from './agePrefMale';

interface ToggleButtonsState {
    women: boolean;
    men: boolean;
}

class ToggleSwitch extends Component<{}, ToggleButtonsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            women: true,
            men: false
        };
    }

    handleButton1Click = () => {
        this.setState({
            women: true,
            men: false,
        });
    };

    handleButton2Click = () => {
        this.setState({
            men: true,
            women: false,
        });
    };

    render() {
        const { women } = this.state;
        const { men } = this.state;

        const button1Class = women ? 'bg-rose-400' : 'bg-inherit';
        const button2Class = men ? 'bg-sky-400' : 'bg-inherit';

        return (
            <div>
                <div className="sm:mx-[10%] lg:mx-[20%] -mb-2 -mt-4 sm:my-4 flex-col h-full">
                    <div className="h-4/5">
                        <div className={women ? 'block' : 'hidden'}>
                            <AgePrefFemale />
                        </div>
                        <div className={men ? 'block' : 'hidden'}>
                            <AgePrefMale />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mx-auto flex text-gray-500 font-bold">
                            <button className="flex" onClick={this.handleButton1Click}>
                                <div className={`w-5 h-5 mt-0.5 ${button1Class} rounded-full border-2 border-gray-500 mr-0.5`}></div>
                                <p>Women</p>
                            </button>
                            <button className="flex ml-5" onClick={this.handleButton2Click}>
                                <div className={`w-5 h-5 mt-0.5 ${button2Class} rounded-full border-2 border-gray-500 mr-0.5`}></div>
                                <p>Men</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToggleSwitch;