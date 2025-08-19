exports.handler = async (event, context) => {
  try {
    // Parse the incoming request body
    const payload = JSON.parse(event.body).payload

    console.log("Form submission received:", payload)

    // Here you can add additional processing:
    // - Send email notifications
    // - Store data in a database
    // - Trigger other workflows

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Form submission processed successfully",
        data: payload,
      }),
    }
  } catch (error) {
    console.error("Error processing form submission:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing form submission",
        error: error.message,
      }),
    }
  }
}
