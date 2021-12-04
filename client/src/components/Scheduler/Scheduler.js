import React from 'react'

export default function Scheduler() {
    return (
        <div>
            <div className="scheduler">
                <form

                >
                    <h3>Schedule Meeting</h3>
                    <input placeholder="meeting title" type="text"
                        name="meetingtitle"
                        type="text" style={{ width: '150px' }}
                        ref="meetingtitle"
                        // value={this.state.meetingtitle}
                        // onChange={this.onChange}

                    /><br></br><br></br>
                    <textarea placeholder="description"
                        name="meetingdescription"
                        type="text" style={{ width: '150px' }}
                        ref="meetingdescription"
                        // value={this.state.meetingdescription}
                        // onChange={this.onChange}
                    /><br></br><br></br>
                    <select placeholder="Date" type="text"
                        name="meetingDate"
                        type="text" style={{ width: '30px' }}
                        ref="meetingDate"
                        // value={this.state.meetingDate}
                        // onChange={this.onChange}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>

                    </select>
                    <select
                        placeholder="Month" type="text"
                        name="meetingMonth"
                        type="text" style={{ width: '100px' }}
                        ref="meetingMonth"
                        // value={this.state.meetingMonth}
                        // onChange={this.onChange}
                    >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>



                    </select>
                    <select placeholder="Year" type="text"
                        name="meetingYear"
                        type="text" style={{ width: '60px' }}
                        ref="meetingYear"
                        // value={this.state.meetingYear}
                        // onChange={this.onChange}
                    >
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>

                    </select><br></br><br></br>


                    <input className='input'
                        placeholder="Hrs"
                        name="meetingHrs"
                        type="text" style={{ width: '30px' }}
                        ref="meetingHrs"
                        // value={this.state.meetingHrs}
                        // onChange={this.onChange}
                    />
                    /
                    <input
                        placeholder="Min"
                        type="text" style={{ width: '30px' }}
                        name="meetingMin"
                        type="text" style={{ width: '30px' }}
                        ref="meetingMin"
                        // value={this.state.meetingMin}
                        // onChange={this.onChange}

                    /> /
                    <input
                        placeholder="Sec"
                        type="text"
                        style={{ width: '30px' }}
                        name="meetingSec"
                        type="text" style={{ width: '30px' }}
                        ref="meetingSec"
                        // value={this.state.meetingSec}
                        // onChange={this.onChange}
                    />


                    
                    <button>Confirm</button>
                </form>

            </div>
        </div>
    )
}
