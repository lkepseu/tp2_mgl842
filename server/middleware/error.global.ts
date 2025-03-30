export default defineEventHandler(async (event) => {
    try {
        console.log("Middleware executé :");
    } catch (error: any) {
        console.error("Error detected :", error.message);
        return createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || "Internal server error",
        });
    }
});
