<?php
/**
 * Dedicated Blog Archive Page Template (home.php)
 *
 * Handles exactly 10 posts per page with native WordPress pagination
 * and Grid/List view switcher.
 *
 * @package TechForGo
 * @since 1.0.1
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-archive-header-row">
			<div class="tfg-archive-header-text">
				<h1 class="tfg-archive-title"><?php esc_html_e( 'The TechForGo Journal', 'techforgo' ); ?></h1>
				<p class="tfg-archive-description">
					<?php esc_html_e( 'Complete chronological archive of deep architectural inquiries, technical teardowns, and engineering dispatches. Displaying 10 publications per volume.', 'techforgo' ); ?>
				</p>
			</div>

			<!-- Grid/List View Switcher Controls -->
			<div class="tfg-view-switcher" role="group" aria-label="<?php esc_attr_e( 'Layout View Switcher', 'techforgo' ); ?>">
				<button type="button" class="tfg-view-btn is-active" id="tfg-view-grid-btn" aria-pressed="true" aria-label="<?php esc_attr_e( 'Grid View', 'techforgo' ); ?>">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
					<span><?php esc_html_e( 'Grid', 'techforgo' ); ?></span>
				</button>
				<button type="button" class="tfg-view-btn" id="tfg-view-list-btn" aria-pressed="false" aria-label="<?php esc_attr_e( 'List View', 'techforgo' ); ?>">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
					<span><?php esc_html_e( 'List', 'techforgo' ); ?></span>
				</button>
			</div>
		</div>

		<!-- Two-column layout on desktop: 70% Main Content, 30% Sidebar -->
		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<?php if ( have_posts() ) : ?>

					<div class="tfg-posts-grid" id="tfg-posts-container">
						<?php
						while ( have_posts() ) :
							the_post();
							get_template_part( 'template-parts/content-card' );
						endwhile;
						?>
					</div>

					<!-- Native WordPress Numeric Pagination (10 posts per page) -->
					<?php techforgo_pagination(); ?>

				<?php else : ?>
					<div class="tfg-no-posts">
						<h2><?php esc_html_e( 'No Publications Found', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Check back soon for new research volumes.', 'techforgo' ); ?></p>
					</div>
				<?php endif; ?>
			</div>

			<!-- 30% Sidebar -->
			<?php get_sidebar(); ?>
		</div>

	</div>
</main>

<?php
get_footer();
