import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as quotes from "./quotesRedux";

const QuotesFilter = (props) => {
  const applyFilter = (values) => {
    props.getQuotes(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          trnType: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Transaction Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="Service">Service</option>
                  <option value="Sales">Sales</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Transaction Type
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, quotes.actions)(QuotesFilter);
