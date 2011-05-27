<?php
/**
 * File containing the eZURIRegression class
 *
 * @copyright Copyright (C) 1999-2011 eZ Systems AS. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.txt GNU General Public License v2
 * @version //autogentag//
 * @package tests
 */

class eZURIRegression extends ezpTestCase
{
    public function __construct()
    {
        parent::__construct();
        $this->setName( "eZURI Regression Tests" );
    }

    public function setUp()
    {
        parent::setUp();
        // Set the RequestURI to a known value so that eZSys::requestURI()
        // returns something known and useful.
        $ezsys = eZSys::instance();
        $this->originalRequestURI = $ezsys->RequestURI;
        $ezsys->RequestURI = "/all/work/and/no/sleep/makes/(ole)/a/(dull)/boy";
    }

    public function tearDown()
    {
        // Make sure to restore the RequestURI in case other tests depends on
        // on the RequestURI variable.
        $ezsys = eZSys::instance();
        $ezsys->RequestURI = $this->originalRequestURI;
        parent::tearDown();
    }

    /**
     * Test scenario for issue #13186: UserParameters works differently in 4.0 compared to 3.10
     *
     * @result $eZURI->userParameters() returns an empty array
     * @expected $eZURI->userParameters() should return array( "ole" => "a", "dull" => "boy" ).
     *
     * @link http://issues.ez.no/13186
     */
    public function testUserParameters()
    {
        $expectedParams = array( "ole" => "a", "dull" => "boy" );

        $eZURI = eZURI::instance();
        $userParams = $eZURI->userParameters();

        $this->assertEquals( $expectedParams, $userParams );
    }
}

?>
