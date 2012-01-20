<?php
/**
 * File containing the eZDBClusterStaleCacheTest class.
 *
 * @copyright Copyright (C) 1999-2010 eZ Systems AS. All rights reserved.
 * @license http://ez.no/licenses/gnu_gpl GNU GPL v2
 * @version //autogentag//
 * @package tests
 */

/**
 * This test applies to the stalecache features for the eZDB cluster handler
 * @package tests
 * @group cluster
 * @group eZDB
 */
class eZDBClusterStaleCacheTest extends eZClusterStaleCacheTest
{
    /**
     * @var array
     **/
    protected $sqlFiles = array( 'kernel/sql/mysql/cluster_schema.sql' );

    /**
     * Test setup
     *
     * Load an instance of file.ini
     * Assigns DB parameters for cluster
     **/
    public function setUp()
    {
        parent::setUp();

        // We need to clear the existing handler if it was loaded before the INI
        // settings changes
        if ( isset( $GLOBALS['eZClusterFileHandler_chosen_handler'] ) and
            !$GLOBALS['eZClusterFileHandler_chosen_handler'] instanceof eZDBFileHandler )
            unset( $GLOBALS['eZClusterFileHandler_chosen_handler'] );

        unset( $GLOBALS['eZClusterInfo'] );

        // Load database parameters for cluster
        // The same DSN than the relational database is used
        $fileINI = eZINI::instance( 'file.ini' );
        $this->previousFileHandler = $fileINI->variable( 'ClusteringSettings', 'FileHandler' );
        $fileINI->setVariable( 'ClusteringSettings', 'FileHandler', 'eZDBFileHandler' );

        $dsn = ezpTestRunner::dsn()->parts;
        switch ( $dsn['phptype'] )
        {
            case 'mysql':
                $backend = 'eZDBFileHandlerMysqlBackend';
                break;

            case 'mysqli':
                $backend = 'eZDBFileHandlerMysqliBackend';
                break;

            case 'postgresql':
                $backend = 'eZDBFileHandlerPostgresqlBackend';
                break;

            default:
                $this->markTestSkipped( "Unsupported database type '{$dsn['phptype']}'" );
        }
        $fileINI->setVariable( 'ClusteringSettings', 'DBBackend',  $backend );
        $fileINI->setVariable( 'ClusteringSettings', 'DBHost',     $dsn['host'] );
        $fileINI->setVariable( 'ClusteringSettings', 'DBPort',     $dsn['port'] );
        $fileINI->setVariable( 'ClusteringSettings', 'DBSocket',   $dsn['socket'] );
        $fileINI->setVariable( 'ClusteringSettings', 'DBName',     $dsn['database'] );
        $fileINI->setVariable( 'ClusteringSettings', 'DBUser',     $dsn['user'] );
        $fileINI->setVariable( 'ClusteringSettings', 'DBPassword', $dsn['password'] );

        // ezpTestDatabaseHelper::insertSqlData( $this->sharedFixture, $this->sqlFiles );

        $this->db = $this->sharedFixture;
    }

    public function tearDown()
    {
        // restore the previous file handler
        if ( $this->previousFileHandler !== null )
        {
            $fileINI = eZINI::instance( 'file.ini' );
            $fileINI->setVariable( 'ClusteringSettings', 'FileHandler', $this->previousFileHandler );
            $this->previousFileHandler = null;
            if ( isset( $GLOBALS['eZClusterFileHandler_chosen_handler'] ) )
                unset( $GLOBALS['eZClusterFileHandler_chosen_handler'] );
        }

        parent::tearDown();
    }
}
?>