<?php
/**
 * The template for displaying category archives
 *
 * Includes category header, description, Grid/List view switcher, and posts.
 *
 * @package TechForGo
 * @since 1.0.2
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">

		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-archive-header-row">
			<div class="tfg-archive-header-text">
				<div class="tfg-meta-row">
					<span class="tfg-category-label"><?php esc_html_e( 'Category Track', 'techforgo' ); ?></span>
				</div>
				<h1 class="tfg-archive-title"><?php single_cat_title(); ?></h1>
				<?php
				$tfg_cat_desc = category_description();
				if ( ! empty( $tfg_cat_desc ) ) :
					?>
					<div class="tfg-archive-description">
						<?php echo wp_kses_post( $tfg_cat_desc ); ?>
					</div>
				<?php else : ?>
					<p class="tfg-archive-description">
						<?php esc_html_e( 'Peer-reviewed technical coverage, architectural teardowns, and engineering research dispatches.', 'techforgo' ); ?>
					</p>
				<?php endif; ?>
			</div>

			<!-- Grid / List Switcher -->
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

					<?php techforgo_pagination(); ?>

				<?php else : ?>
					<div class="tfg-no-posts">
						<h2><?php esc_html_e( 'No Publications in this Category', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Research articles are currently in peer review for this discipline.', 'techforgo' ); ?></p>
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
