/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/src/stylesheets/datepicker.scss';

type FilterDropDownProps = {
    handleFilter: (filter: any) => void
}

const FilterDropDown: React.FC<FilterDropDownProps> = ({handleFilter}) => {
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    
    return (
        <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
            <div className='px-7 py-5'>
                <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
            </div>

            <div className='separator border-gray-200'></div>

            <div className='px-7 py-5'>
                <div className='mb-10'>
                    <label className='form-label fw-bold'>From:</label>
                    <DatePicker className="form-control" placeholderText="Select a date" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>

                <div className='mb-10'>
                    <label className='form-label fw-bold'>To:</label>
                    <DatePicker className="form-control" placeholderText="Select a date" selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>

                <div className='d-flex justify-content-end'>
                <button
                    type='reset'
                    className='btn btn-sm btn-white btn-active-light-primary me-2'
                    data-kt-menu-dismiss='true'
                    onClick={() => handleFilter({slug: null, from: null, to: null})}
                >
                    Reset
                </button>

                <button 
                    type='button' 
                    className='btn btn-sm btn-primary' 
                    data-kt-menu-dismiss='true'
                    onClick={() => handleFilter({slug: null, from: moment(startDate).format("Y-MM-DD"), to: moment(endDate).format("Y-MM-DD")})}>
                    Apply
                </button>
                </div>
            </div>
        </div>
    )
}

export default FilterDropDown
