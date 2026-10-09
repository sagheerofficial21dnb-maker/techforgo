<?php
/**
 * The template for displaying search results pages
 *
 * @package TechForGo
 * @since 1.0.0
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<header class="tfg-page-header">
			<div class="tfg-meta-row">
				<span class="tfg-category-label"><?php esc_html_e( 'Search Inquiry', 'techforgo' ); ?></span>
			</div>
			<h1 class="tfg-archive-title">
				<?php
				/* translators: %s: search query. */
				printf( esc_html__( 'Results for: "%s"', 'techforgo' ), '<span>' . get_search_query() . '</span>' );
				?>
			</h1>
			<p class="tfg-archive-description">
				<?php
				global $wp_query;
				printf(
					/* translators: %d: number of search results found. */
					esc_html( _n( 'Discovered %d matching editorial analysis.', 'Discovered %d matching editorial analyses.', (int) $wp_query->found_posts, 'techforgo' ) ),
					(int) $wp_query->found_posts
				);
				?>
			</p>
		</header>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php if ( have_posts() ) : ?>

					<div class="tfg-posts-grid">
						<?php
						while ( have_posts() ) :
							the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						?>
					</div>

					<?php techforgo_pagination(); ?>

				<?php else : ?>
					<div class="tfg-no-posts">
						<h2><?php esc_html_e( 'No Direct Inquiries Matched', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Try different keywords or explore our primary research tracks in the sidebar.', 'techforgo' ); ?></p>
						<div class="tfg-search-fallback-box">
							<form role="search" method="get" class="tfg-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
								<input type="search" class="tfg-search-input" placeholder="<?php esc_attr_e( 'Search again...', 'techforgo' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
								<button type="submit" class="tfg-search-submit"><?php esc_html_e( 'Search', 'techforgo' ); ?></button>
							</form>
						</div>
					</div>
				<?php endif; ?>
			</div>

			<?php get_sidebar(); ?>
		</div>

	</div>
</main>

<?php
get_footer();
