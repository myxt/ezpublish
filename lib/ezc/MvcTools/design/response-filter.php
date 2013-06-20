<?php
/**
 * A response filter is responsible for altering the response object.
 * 
 * @package MvcTools
 * @version 1.1.2
 */
interface ezcMvcResponseFilter
{
    /**
     * Alters the response object.
     * 
     * @param ezcMvcResponse $response Response object to alter.
     * @return void
     */
    public function filterResponse( ezcMvcResponse $response );
}
?>
