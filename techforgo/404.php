<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * Includes search bar, quick links, and popular articles grid.
 *
 * @package TechForGo
 * @since 1.0.2
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<section class="tfg-error-404 not-found" style="max-width: 860px; margin: 40px auto; padding: 32px 0;">
			<div class="tfg-404-header" style="text-align: center; margin-bottom: 32px;">
				<span class="tfg-404-code" style="font-size: 64px; font-weight: 900; color: #0066CC; display: block; line-height: 1;">404</span>
				<h1 class="tfg-single-title" style="font-size: 28px; margin: 12px 0 8px 0;"><?php esc_html_e( 'Endpoint Not Found', 'techforgo' ); ?></h1>
				<p class="tfg-single-deck" style="font-size: 15px; color: #666666; max-width: 580px; margin: 0 auto;">
					<?php esc_html_e( 'The technical dispatch or journal volume you requested has been archived, relocated, or does not exist in the current index.', 'techforgo' ); ?>
				</p>
			</div>

			<div class="tfg-404-search-box" style="max-width: 480px; margin: 0 auto 40px auto;">
				<form role="search" method="get" class="tfg-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
					<label class="screen-reader-text" for="tfg-404-search-field"><?php esc_html_e( 'Search the TechForGo library:', 'techforgo' ); ?></label>
					<div class="tfg-search-input-group" style="display: flex; gap: 8px;">
						<input type="search" id="tfg-404-search-field" class="tfg-search-field" placeholder="<?php esc_attr_e( 'Search the library (e.g. eBPF, Quantum)...', 'techforgo' ); ?>" name="s" style="flex: 1; padding: 10px 14px; border: 1px solid #E5E5E5; border-radius: 4px;" />
						<button type="submit" class="tfg-search-button" style="padding: 10px 20px; background: #0066CC; color: #FFF; font-weight: 700; border: none; border-radius: 4px; cursor: pointer;"><?php esc_html_e( 'Search', 'techforgo' ); ?></button>
					</div>
				</form>
			</div>

			<!-- Popular Technical Dispatches Grid -->
			<div class="tfg-404-popular" style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #E5E5E5;">
				<h2 class="tfg-section-title" style="margin-bottom: 20px; text-align: center;"><?php esc_html_e( 'Popular Engineering Dispatches', 'techforgo' ); ?></h2>
				<div class="tfg-posts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
					<?php
					$tfg_popular = new WP_Query(
						array(
							'posts_per_page'      => 3,
							'post_status'         => 'publish',
							'ignore_sticky_posts' => true,
						)
					);

					if ( $tfg_popular->have_posts() ) :
						while ( $tfg_popular->have_posts() ) :
							$tfg_popular->the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						wp_reset_postdata();
					endif;
					?>
				</div>
			</div>
		</section>

	</div>
</main>

<?php
get_footer();
