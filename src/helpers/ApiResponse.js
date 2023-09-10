class ApiResponse {
  static notrmalizer(res, type = "single") {
    //type: "single" | "bulk" | "pagination"
    let results;
    let message;
    let count = 0;
    switch (type) {
      case "single":
        results = res.results;
        message = res.message || "";

        // Return a normalized response object
        return {
          results,
          message,
        };
      case "bulk":
        results = res.results;
        message = res.message || "";
        count = res.results.length || 0;

        // Return a normalized response object
        return {
          results,
          message,
          count
        };
      case "pagination":
        results = res.results;
        message = res.message || "";
        count = res.results.length || 0;
        currentPage = 0;
        totalPages = 0;

        return {
          results,
          message,
          currentPage,
          totalPages,
          count
        };
    }
  }
}

module.exports = ApiResponse;
